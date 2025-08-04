const express = require('express');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB setup
const url = process.env.MONGODB_URI; // ✅ use environment variable
const client = new MongoClient(url);
const dbName = 'passop';

// Middleware
app.use(bodyparser.json());
app.use(cors());

// Routes
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

app.post('/', async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const result = await collection.insertOne(password);
  res.send({ success: true, result });
});

app.delete('/', async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const result = await collection.deleteOne(password);
  res.send({ success: true, result });
});

// Start server only after DB connection
async function startServer() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err);
  }
}

startServer();
