import { NextRequest, NextResponse } from 'next/server';
import type { Mongoose } from 'mongoose';
import type { JwtPayload } from 'jsonwebtoken';

type RequestBody = Record<string, unknown>;

type PasswordComparable = {
  comparePassword(candidatePassword: string): Promise<boolean>;
};

const INQUIRY_STATUSES = [
  'new',
  'contacted',
  'in-progress',
  'proposal-sent',
  'closed-won',
  'closed-lost',
] as const;

type InquiryStatus = (typeof INQUIRY_STATUSES)[number];

type RouteResult = {
  status: number;
  data: {
    success: boolean;
    message?: string;
    data?: unknown;
    token?: string;
    user?: unknown;
    environment?: string;
  };
};

type MongooseCache = {
  connection: Mongoose | null;
  promise: Promise<Mongoose> | null;
};

const globalForMongoose = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

const mongooseCache: MongooseCache =
  globalForMongoose.mongooseCache ?? {
    connection: null,
    promise: null,
  };

globalForMongoose.mongooseCache = mongooseCache;

async function connectDB(): Promise<Mongoose> {
  if (mongooseCache.connection) {
    return mongooseCache.connection;
  }

  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('MONGODB_URI environment variable is not configured.');
  }

  if (!mongooseCache.promise) {
    const mongoose = (await import('mongoose')).default;

    mongooseCache.promise = mongoose
      .connect(mongoUri, {
        bufferCommands: false,
      })
      .then(() => mongoose)
      .catch((error) => {
        mongooseCache.promise = null;
        throw error;
      });
  }

  mongooseCache.connection = await mongooseCache.promise;
  return mongooseCache.connection;
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

async function handleRequest(request: NextRequest): Promise<NextResponse> {
  try {
    const url = new URL(request.url);
    const path = getApiPath(url.pathname);
    const method = request.method.toUpperCase();

    // Health checks should not fail just because MongoDB is unavailable.
    if (path === '/health' && method === 'GET') {
      return NextResponse.json(
        {
          success: true,
          message: 'API running',
          environment: 'vercel-serverless',
        },
        { status: 200 },
      );
    }

    await connectDB();

    let body: RequestBody = {};

    if (method === 'POST' || method === 'PATCH') {
      const contentType = request.headers.get('content-type') ?? '';

      if (contentType.includes('application/json')) {
        try {
          const parsedBody: unknown = await request.json();

          if (
            parsedBody !== null &&
            typeof parsedBody === 'object' &&
            !Array.isArray(parsedBody)
          ) {
            body = parsedBody as RequestBody;
          } else {
            return NextResponse.json(
              {
                success: false,
                message: 'Request body must be a JSON object.',
              },
              { status: 400 },
            );
          }
        } catch {
          return NextResponse.json(
            {
              success: false,
              message: 'Invalid JSON request body.',
            },
            { status: 400 },
          );
        }
      }
    }

    const authHeader = request.headers.get('authorization') ?? '';
    const result = await routeRequest(path, method, body, authHeader);

    return NextResponse.json(result.data, { status: result.status });
  } catch (error: unknown) {
    console.error('API request failed:', error);

    const message =
      process.env.NODE_ENV === 'development'
        ? getErrorMessage(error)
        : 'Internal server error.';

    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 500 },
    );
  }
}

function getApiPath(pathname: string): string {
  if (pathname === '/api') {
    return '/';
  }

  if (pathname.startsWith('/api/')) {
    return pathname.slice(4);
  }

  return pathname;
}

async function routeRequest(
  path: string,
  method: string,
  body: RequestBody,
  authHeader: string,
): Promise<RouteResult> {
  const mongoose = (await import('mongoose')).default;

  /*
   * Adjust these import paths if this route file is not located where the
   * original imports expected it to be.
   */
  const User = (await import('@/models/User')).default;
  const Inquiry = (await import('@/models/Inquiry')).default;
  const Subscriber = (await import('@/models/Subscriber')).default;
  const Project = (await import('@/models/Project')).default;

  // ---------------------------------------------------------------------------
  // Authentication routes
  // ---------------------------------------------------------------------------

  if (path === '/auth/register' && method === 'POST') {
    const name = getRequiredString(body.name);
    const email = normalizeEmail(body.email);
    const password = getRequiredString(body.password);

    if (!name || !email || !password) {
      return badRequest('Name, email, and password are required.');
    }

    const adminExists = await User.exists({});

    if (adminExists) {
      return {
        status: 403,
        data: {
          success: false,
          message: 'Registration closed.',
        },
      };
    }

    const existingEmail = await User.exists({ email });

    if (existingEmail) {
      return {
        status: 409,
        data: {
          success: false,
          message: 'A user with this email already exists.',
        },
      };
    }

    const user = await User.create({
      ...body,
      name,
      email,
      password,
      role: 'admin',
    });

    const token = await createToken(String(user._id));

    return {
      status: 201,
      data: {
        success: true,
        token,
        user: sanitizeUser(user),
      },
    };
  }

  if (path === '/auth/login' && method === 'POST') {
    const email = normalizeEmail(body.email);
    const password = getRequiredString(body.password);

    if (!email || !password) {
      return badRequest('Email and password are required.');
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return {
        status: 401,
        data: {
          success: false,
          message: 'Invalid credentials.',
        },
      };
    }

    const passwordUser = user as typeof user & PasswordComparable;

    if (!(await passwordUser.comparePassword(password))) {
      return {
        status: 401,
        data: {
          success: false,
          message: 'Invalid credentials.',
        },
      };
    }

    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    const token = await createToken(String(user._id));

    return {
      status: 200,
      data: {
        success: true,
        token,
        user: sanitizeUser(user),
      },
    };
  }

  if (path === '/auth/me' && method === 'GET') {
    const user = await verifyAuth(authHeader, User);

    if (!user) {
      return unauthorized();
    }

    return {
      status: 200,
      data: {
        success: true,
        user: sanitizeUser(user),
      },
    };
  }

  // ---------------------------------------------------------------------------
  // Inquiry routes
  // ---------------------------------------------------------------------------

  if (path === '/inquiries' && method === 'POST') {
    const name = getRequiredString(body.name);
    const email = normalizeEmail(body.email);

    if (!name || !email) {
      return badRequest('Name and a valid email address are required.');
    }

    const inquiry = await Inquiry.create({
      ...body,
      name,
      email,
    });

    return {
      status: 201,
      data: {
        success: true,
        message: 'Inquiry submitted!',
        data: inquiry,
      },
    };
  }

  if (path === '/inquiries' && method === 'GET') {
    const user = await verifyAuth(authHeader, User);

    if (!user) {
      return unauthorized();
    }

    const inquiries = await Inquiry.find().sort({ createdAt: -1 });

    return {
      status: 200,
      data: {
        success: true,
        data: inquiries,
      },
    };
  }

  if (path === '/inquiries/stats' && method === 'GET') {
    const user = await verifyAuth(authHeader, User);

    if (!user) {
      return unauthorized();
    }

    const [total, statusAggregation, serviceAggregation, recent] =
      await Promise.all([
        Inquiry.countDocuments(),
        Inquiry.aggregate([
          {
            $group: {
              _id: '$status',
              count: { $sum: 1 },
            },
          },
        ]),
        Inquiry.aggregate([
          {
            $group: {
              _id: '$service',
              count: { $sum: 1 },
            },
          },
        ]),
        Inquiry.find()
          .sort({ createdAt: -1 })
          .limit(5)
          .select('name email service status createdAt'),
      ]);

    const byStatus = aggregationToRecord(statusAggregation);
    const byService = aggregationToRecord(serviceAggregation);

    return {
      status: 200,
      data: {
        success: true,
        data: {
          total,
          byStatus,
          byService,
          recent,
        },
      },
    };
  }

  if (path.startsWith('/inquiries/') && method === 'PATCH') {
    const user = await verifyAuth(authHeader, User);

    if (!user) {
      return unauthorized();
    }

    const id = getResourceId(path, '/inquiries/');

    if (!id || !mongoose.isValidObjectId(id)) {
      return badRequest('Invalid inquiry ID.');
    }

    const inquiry = await Inquiry.findById(id);

    if (!inquiry) {
      return notFound('Inquiry not found.');
    }

    const status = getInquiryStatus(body.status);
    const notes = getOptionalString(body.notes);

    if (body.status !== undefined && !status) {
      return badRequest('Invalid inquiry status.');
    }

    if (status) {
      inquiry.status = status;
    }

    if (notes) {
      inquiry.notes.push({
        text: notes,
        addedBy: user.name ?? 'Admin',
      });
    }

    await inquiry.save();

    return {
      status: 200,
      data: {
        success: true,
        data: inquiry,
      },
    };
  }

  if (path.startsWith('/inquiries/') && method === 'DELETE') {
    const user = await verifyAuth(authHeader, User);

    if (!user) {
      return unauthorized();
    }

    const id = getResourceId(path, '/inquiries/');

    if (!id || !mongoose.isValidObjectId(id)) {
      return badRequest('Invalid inquiry ID.');
    }

    const inquiry = await Inquiry.findByIdAndDelete(id);

    if (!inquiry) {
      return notFound('Inquiry not found.');
    }

    return {
      status: 200,
      data: {
        success: true,
        message: 'Inquiry deleted.',
      },
    };
  }

  // ---------------------------------------------------------------------------
  // Subscriber routes
  // ---------------------------------------------------------------------------

  if (path === '/subscribers' && method === 'POST') {
    const email = normalizeEmail(body.email);

    if (!email) {
      return badRequest('A valid email address is required.');
    }

    await Subscriber.findOneAndUpdate(
      { email },
      {
        $set: {
          email,
          isActive: true,
        },
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    );

    return {
      status: 200,
      data: {
        success: true,
        message: 'Subscribed!',
      },
    };
  }

  if (path === '/subscribers' && method === 'GET') {
    const user = await verifyAuth(authHeader, User);

    if (!user) {
      return unauthorized();
    }

    const subscribers = await Subscriber.find().sort({ createdAt: -1 });

    return {
      status: 200,
      data: {
        success: true,
        data: subscribers,
      },
    };
  }

  // ---------------------------------------------------------------------------
  // Project routes
  // ---------------------------------------------------------------------------

  if (path === '/projects/featured' && method === 'GET') {
    const projects = await Project.find({ featured: true }).sort({
      createdAt: -1,
    });

    return {
      status: 200,
      data: {
        success: true,
        data: projects,
      },
    };
  }

  if (path === '/projects' && method === 'GET') {
    const user = await verifyAuth(authHeader, User);

    if (!user) {
      return unauthorized();
    }

    const projects = await Project.find().sort({ createdAt: -1 });

    return {
      status: 200,
      data: {
        success: true,
        data: projects,
      },
    };
  }

  if (path === '/projects' && method === 'POST') {
    const user = await verifyAuth(authHeader, User);

    if (!user) {
      return unauthorized();
    }

    const project = await Project.create(body);

    return {
      status: 201,
      data: {
        success: true,
        data: project,
      },
    };
  }

  if (path.startsWith('/projects/') && method === 'PATCH') {
    const user = await verifyAuth(authHeader, User);

    if (!user) {
      return unauthorized();
    }

    const id = getResourceId(path, '/projects/');

    if (!id || !mongoose.isValidObjectId(id)) {
      return badRequest('Invalid project ID.');
    }

    const project = await Project.findByIdAndUpdate(
      id,
      {
        $set: body,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!project) {
      return notFound('Project not found.');
    }

    return {
      status: 200,
      data: {
        success: true,
        data: project,
      },
    };
  }

  if (path.startsWith('/projects/') && method === 'DELETE') {
    const user = await verifyAuth(authHeader, User);

    if (!user) {
      return unauthorized();
    }

    const id = getResourceId(path, '/projects/');

    if (!id || !mongoose.isValidObjectId(id)) {
      return badRequest('Invalid project ID.');
    }

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return notFound('Project not found.');
    }

    return {
      status: 200,
      data: {
        success: true,
        message: 'Project deleted.',
      },
    };
  }

  return {
    status: 404,
    data: {
      success: false,
      message: 'Route not found.',
    },
  };
}

async function createToken(userId: string): Promise<string> {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT_SECRET environment variable is not configured.');
  }

  const jwt = (await import('jsonwebtoken')).default;

  return jwt.sign(
    {
      id: userId,
    },
    jwtSecret,
    {
      expiresIn: '7d',
    },
  );
}

async function verifyAuth(authHeader: string, User: any): Promise<any | null> {
  const match = authHeader.match(/^Bearer\s+(.+)$/i);

  if (!match) {
    return null;
  }

  const token = match[1]?.trim();
  const jwtSecret = process.env.JWT_SECRET;

  if (!token || !jwtSecret) {
    return null;
  }

  try {
    const jwt = (await import('jsonwebtoken')).default;
    const decoded = jwt.verify(token, jwtSecret);

    if (
      typeof decoded === 'string' ||
      !decoded ||
      typeof decoded !== 'object'
    ) {
      return null;
    }

    const payload = decoded as JwtPayload & {
      id?: string;
    };

    if (!payload.id) {
      return null;
    }

    return await User.findById(payload.id).select('-password');
  } catch {
    return null;
  }
}

function sanitizeUser(user: any): Record<string, unknown> | null {
  if (!user) {
    return null;
  }

  const plainUser =
    typeof user.toObject === 'function'
      ? user.toObject()
      : { ...user };

  delete plainUser.password;
  delete plainUser.__v;

  return plainUser;
}

function aggregationToRecord(
  aggregation: Array<{ _id?: unknown; count?: unknown }>,
): Record<string, number> {
  const result: Record<string, number> = {};

  for (const item of aggregation) {
    if (typeof item._id !== 'string' || typeof item.count !== 'number') {
      continue;
    }

    result[item._id] = item.count;
  }

  return result;
}

function getResourceId(path: string, prefix: string): string | null {
  if (!path.startsWith(prefix)) {
    return null;
  }

  const id = path.slice(prefix.length).split('/')[0]?.trim();

  return id || null;
}

function getRequiredString(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  const cleaned = value.trim();
  return cleaned.length > 0 ? cleaned : null;
}

function getOptionalString(value: unknown): string | null {
  return getRequiredString(value);
}

function getInquiryStatus(value: unknown): InquiryStatus | null {
  const status = getOptionalString(value);

  return status && INQUIRY_STATUSES.includes(status as InquiryStatus)
    ? (status as InquiryStatus)
    : null;
}

function normalizeEmail(value: unknown): string | null {
  const email = getRequiredString(value)?.toLowerCase();

  if (!email) {
    return null;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailPattern.test(email) ? email : null;
}

function badRequest(message: string): RouteResult {
  return {
    status: 400,
    data: {
      success: false,
      message,
    },
  };
}

function unauthorized(): RouteResult {
  return {
    status: 401,
    data: {
      success: false,
      message: 'Unauthorized.',
    },
  };
}

function notFound(message: string): RouteResult {
  return {
    status: 404,
    data: {
      success: false,
      message,
    },
  };
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unknown server error.';
}
