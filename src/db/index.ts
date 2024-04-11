import mongoose, { Connection } from "mongoose";
import session from 'express-session';
import MongoDBSessionStore from 'connect-mongodb-session';
require('dotenv').config();

const mongoDBURI: string = process.env.MONGODB_URI !== undefined ? process.env.MONGODB_URI : "mongodb://127.0.0.1:27017/growAfricadb";

mongoose
  .connect(mongoDBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch((e: Error) => {
    console.error("MongoDB connection error:", e.message);
  });

const db: Connection = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Setup MongoDBSessionStore
const MongoDBStore = MongoDBSessionStore(session);
const store = new MongoDBStore({
  uri: mongoDBURI,
  collection: 'sessions' 
});

store.on('error', function(error) {
  console.error('Session Store Error:', error);
});

export { db, store };
