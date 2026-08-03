import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory cache for Mongoose connection
let cachedDb: any = null;

async function connectDB() {
  if (cachedDb) return cachedDb;
  
  const mongoose = await import('mongoose');
  
  if (mongoose.default.connection.readyState === 1) {
    cachedDb = mongoose.default;
    return cachedDb;
  }

  await mongoose.default.connect(process.env.MONGODB_URI || '');
  cachedDb = mongoose.default;
  return cachedDb;
}

export async function GET(request: NextRequest) {
  return handleRequest(request);
}

export async function POST(request: NextRequest) {
  return handleRequest(request);
}

export async function PATCH(request: NextRequest) {
  return handleRequest(request);
}

export async function DELETE(request: NextRequest) {
  return handleRequest(request);
}

async function handleRequest(request: NextRequest) {
  try {
    // Connect to MongoDB
    await connectDB();

    const url = new URL(request.url);
    const path = url.pathname.replace('/api', '');
    const method = request.method;

    // Get body for POST/PATCH
    let body = {};
    if (method === 'POST' || method === 'PATCH') {
      try {
        body = await request.json();
      } catch { body = {}; }
    }

    // Get auth header
    const authHeader = request.headers.get('authorization') || '';

    // Route to the right handler
    const result = await routeRequest(path, method, body, authHeader);
    return NextResponse.json(result.data, { status: result.status });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

async function routeRequest(path: string, method: string, body: any, auth: string) {
  // Import models
  const User = (await import('../../../server/src/models/User.js')).default;
  const Inquiry = (await import('../../../server/src/models/Inquiry.js')).default;
  const Subscriber = (await import('../../../server/src/models/Subscriber.js')).default;
  const Project = (await import('../../../server/src/models/Project.js')).default;

  // ---- AUTH ROUTES ----
  if (path === '/auth/register' && method === 'POST') {
    const adminExists = await User.findOne({});
    if (adminExists) return { status: 403, data: { success: false, message: 'Registration closed.' } };
    const user = await User.create({ ...body, role: 'admin' });
    const jwt = await import('jsonwebtoken');
    const token = jwt.default.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    return { status: 201, data: { success: true, token, user } };
  }

  if (path === '/auth/login' && method === 'POST') {
    const user = await User.findOne({ email: body.email }).select('+password');
    if (!user || !(await user.comparePassword(body.password))) {
      return { status: 401, data: { success: false, message: 'Invalid credentials.' } };
    }
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });
    const jwt = await import('jsonwebtoken');
    const token = jwt.default.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    return { status: 200, data: { success: true, token, user } };
  }

  if (path === '/auth/me' && method === 'GET') {
    const user = await verifyAuth(auth, User);
    if (!user) return { status: 401, data: { success: false, message: 'Unauthorized.' } };
    return { status: 200, data: { success: true, user } };
  }

  // ---- INQUIRY ROUTES ----
  if (path === '/inquiries' && method === 'POST') {
    const inquiry = await Inquiry.create(body);
    return { status: 201, data: { success: true, message: 'Inquiry submitted!', data: inquiry } };
  }

  if (path === '/inquiries' && method === 'GET') {
    const user = await verifyAuth(auth, User);
    if (!user) return { status: 401, data: { success: false, message: 'Unauthorized.' } };
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    return { status: 200, data: { success: true, data: inquiries } };
  }

  if (path === '/inquiries/stats' && method === 'GET') {
    const user = await verifyAuth(auth, User);
    if (!user) return { status: 401, data: { success: false, message: 'Unauthorized.' } };
    const total = await Inquiry.countDocuments();
    const byStatus = {};
    const agg = await Inquiry.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } }]);
    agg.forEach(i => byStatus[i._id] = i.count);
    const recent = await Inquiry.find().sort({ createdAt: -1 }).limit(5).select('name email service status createdAt');
    return { status: 200, data: { success: true, data: { total, byStatus, byService: {}, recent } } };
  }

  if (path.startsWith('/inquiries/') && method === 'PATCH') {
    const user = await verifyAuth(auth, User);
    if (!user) return { status: 401, data: { success: false, message: 'Unauthorized.' } };
    const id = path.split('/')[2];
    const inquiry = await Inquiry.findById(id);
    if (!inquiry) return { status: 404, data: { success: false, message: 'Not found.' } };
    if (body.status) inquiry.status = body.status;
    if (body.notes) inquiry.notes.push({ text: body.notes, addedBy: user.name });
    await inquiry.save();
    return { status: 200, data: { success: true, data: inquiry } };
  }

  if (path.startsWith('/inquiries/') && method === 'DELETE') {
    const user = await verifyAuth(auth, User);
    if (!user) return { status: 401, data: { success: false, message: 'Unauthorized.' } };
    const id = path.split('/')[2];
    await Inquiry.findByIdAndDelete(id);
    return { status: 200, data: { success: true, message: 'Deleted.' } };
  }

  // ---- SUBSCRIBER ROUTES ----
  if (path === '/subscribers' && method === 'POST') {
    await Subscriber.findOneAndUpdate({ email: body.email }, { email: body.email, isActive: true }, { upsert: true });
    return { status: 200, data: { success: true, message: 'Subscribed!' } };
  }

  if (path === '/subscribers' && method === 'GET') {
    const user = await verifyAuth(auth, User);
    if (!user) return { status: 401, data: { success: false, message: 'Unauthorized.' } };
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    return { status: 200, data: { success: true, data: subscribers } };
  }

  // ---- PROJECT ROUTES ----
  if (path === '/projects/featured' && method === 'GET') {
    const projects = await Project.find({ featured: true });
    return { status: 200, data: { success: true, data: projects } };
  }

  if (path === '/projects' && method === 'GET') {
    const user = await verifyAuth(auth, User);
    if (!user) return { status: 401, data: { success: false, message: 'Unauthorized.' } };
    const projects = await Project.find().sort({ createdAt: -1 });
    return { status: 200, data: { success: true, data: projects } };
  }

  if (path === '/projects' && method === 'POST') {
    const user = await verifyAuth(auth, User);
    if (!user) return { status: 401, data: { success: false, message: 'Unauthorized.' } };
    const project = await Project.create(body);
    return { status: 201, data: { success: true, data: project } };
  }

  if (path.startsWith('/projects/') && method === 'PATCH') {
    const user = await verifyAuth(auth, User);
    if (!user) return { status: 401, data: { success: false, message: 'Unauthorized.' } };
    const id = path.split('/')[2];
    const project = await Project.findByIdAndUpdate(id, body, { new: true });
    return { status: 200, data: { success: true, data: project } };
  }

  if (path.startsWith('/projects/') && method === 'DELETE') {
    const user = await verifyAuth(auth, User);
    if (!user) return { status: 401, data: { success: false, message: 'Unauthorized.' } };
    const id = path.split('/')[2];
    await Project.findByIdAndDelete(id);
    return { status: 200, data: { success: true, message: 'Deleted.' } };
  }

  // ---- HEALTH ----
  if (path === '/health') {
    return { status: 200, data: { success: true, message: 'API running', environment: 'vercel-serverless' } };
  }

  return { status: 404, data: { success: false, message: 'Route not found.' } };
}

async function verifyAuth(authHeader: string, User: any) {
  if (!authHeader?.startsWith('Bearer')) return null;
  const jwt = await import('jsonwebtoken');
  try {
    const decoded = jwt.default.verify(authHeader.split(' ')[1], process.env.JWT_SECRET || 'secret');
    const user = await User.findById(decoded.id);
    return user;
  } catch {
    return null;
  }
}