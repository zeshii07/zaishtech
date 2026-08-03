import { MongoClient, ServerApiVersion } from 'mongodb';

// REPLACE THIS WITH YOUR ACTUAL CONNECTION STRING + REAL PASSWORD
const uri = "mongodb://zeeshansultan785_db_user:Zeeshan786ahsan786@ac-qsxiknc-shard-00-00.ykb9hwt.mongodb.net:27017,ac-qsxiknc-shard-00-01.ykb9hwt.mongodb.net:27017,ac-qsxiknc-shard-00-02.ykb9hwt.mongodb.net:27017/?ssl=true&replicaSet=atlas-j4ia02-shard-0&authSource=admin&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ SUCCESS! Connected to MongoDB Atlas!");
    
    // Try creating the nexaflow database
    const db = client.db("nexaflow");
    const collections = await db.listCollections().toArray();
    console.log(`✅ Database "nexaflow" accessible — ${collections.length} collections exist`);
    
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);