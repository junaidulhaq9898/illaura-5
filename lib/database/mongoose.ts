import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Use the correct type for global cache, not `any`
declare global {
  var mongoose: MongooseConnection | undefined;
}

// Initialize the cached connection variable
const cached: MongooseConnection = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async (): Promise<Mongoose> => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URL) {
    throw new Error("Missing MONGODB_URL");
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL, {
      dbName: "imaginify",
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};