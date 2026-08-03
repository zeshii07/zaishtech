import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import env from './config/env.js';

const resetAdmin = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log('✅ Connected to MongoDB');

    // Delete ALL existing users
    const deleteResult = await User.deleteMany({});
    console.log(`🗑️  Deleted ${deleteResult.deletedCount} old user(s)`);

    // ====== CHANGE THESE TO YOUR NEW CREDENTIALS ======
    const newAdmin = {
      name: 'Zaishtech Admin',           // Your name
      email: 'admin@zaishtech.com',       // Your new email
      password: 'Zaishtech@2025',         // Your new password
      role: 'admin',
    };
    // ==================================================

    const user = await User.create(newAdmin);

    console.log('');
    console.log('✅ New admin created successfully!');
    console.log('─────────────────────────────────────');
    console.log(`   Name:     ${newAdmin.name}`);
    console.log(`   Email:    ${newAdmin.email}`);
    console.log(`   Password: ${newAdmin.password}`);
    console.log('─────────────────────────────────────');
    console.log(`🔗 Login at: http://localhost:3000/login`);
    console.log('');

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

resetAdmin();