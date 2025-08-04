const express = require('express')
const bodyparser =require('body-parser')
const dotenv =require('dotenv')
const { MongoClient } = require('mongodb');
const cors=require('cors')


dotenv.config()
// Connection URL
const url = 'mongodb+srv://GreatStack:Greatstack123@cluster0.cqm0nuw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(url);

// Database Name
const dbName = 'passop'
const app = express()
const port = 3000
 client.connect();
app.use(bodyparser.json())
app.use(cors())

// get all the passwords
app.get('/',async(req, res) => {
    const db=client.db(dbName);
    const collection=db.collection('passwords');
    const findResult = await collection.find({}).toArray();
  res.json(findResult)
})
//save a password
app.post('/',async(req, res) => {
    const password=req.body
    const db=client.db(dbName);
    const collection=db.collection('passwords');
    const findResult = await collection.insertOne(password);
  res.send({success:true,result:findResult})
})
//delete a password by id
app.delete('/',async(req, res) => {
    const password=req.body
    const db=client.db(dbName);
    const collection=db.collection('passwords');
    const findResult = await collection.deleteOne(password);
  res.send({success:true,result:findResult})
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
