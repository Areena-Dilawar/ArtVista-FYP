const mongoose = require ('mongoose');
const mongoURL = 'mongodb://localhost:27017/ArtVista';

mongoose.connect(mongoURL);
const db = mongoose.connection;

db.on('connected',()=>{console.log("Connected to MongoDB")});
db.on('disconnected',()=>{console.log("DisConnected to MongoDB")});
db.on('error',(err)=>{console.log("Error Connecting to MongoDB", err)});

module.exports=db;
