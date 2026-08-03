import mongoose from 'mongoose';
import env from './env.js';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.mongoUri, {
      // Atlas-specific options for compatibility
      serverApi: {
        version: '1', // ServerApiVersion.v1 equivalent for Mongoose
        strict: true,
        deprecationErrors: true,
      },
    });
    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`);
    
    // Helpful hints
    if (error.message.includes('ENODATA') || error.message.includes('querySrv')) {
      console.error(`
      💡 FIX: This DNS error usually means:
         1. Go to Atlas → Network Access → Add IP: 0.0.0.0/0
         2. Wait 2-3 minutes for the change to propagate
         3. If still failing, try the non-SRV connection format
      `);
    }
    
    if (error.message.includes('Authentication') || error.message.includes('bad auth')) {
      console.error(`
      💡 FIX: Authentication failed. Check:
         1. Password in .env matches Atlas Database Access password
         2. Username is correct
         3. Special characters in password are URL-encoded (e.g., # → %23)
      `);
    }
    
    process.exit(1);
  }
};

export default connectDB;