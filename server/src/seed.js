import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import User from './models/User.js';
import env from './config/env.js';

const createAdmin = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log('✅ Connected to MongoDB');

    const existing = await User.findOne({ email: 'admin@nexaflow.dev' });
    if (existing) {
      console.log('');
      console.log('⚠️  Admin already exists!');
      console.log('   Email: admin@nexaflow.dev');
      console.log('   Go to http://localhost:3000/login to sign in');
      console.log('');
      await mongoose.disconnect();
      return;
    }

    const admin = await User.create({
      name: 'Admin',
      email: 'admin@nexaflow.dev',
      password: 'admin12345',
      role: 'admin',
    });

    console.log('');
    console.log('✅ Admin user created!');
    console.log('   Email:    admin@nexaflow.dev');
    console.log('   Password: admin12345');
    console.log('');
    console.log('🔗 Login at: http://localhost:3000/login');
    console.log('');

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

createAdmin();