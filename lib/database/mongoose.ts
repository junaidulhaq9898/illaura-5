import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error("Missing MONGODB_URL");
}

// Define a global type for caching the connection
declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

// Initialize the global cache if it doesn't exist
global.mongoose = global.mongoose || { conn: null, promise: null };

export const connectToDatabase = async (): Promise<Mongoose> => {
  if (global.mongoose.conn) {
    return global.mongoose.conn;
  }

  if (!global.mongoose.promise) {
    global.mongoose.promise = mongoose.connect(MONGODB_URL, {
      dbName: "imaginify",
      bufferCommands: false,
    });
  }

  global.mongoose.conn = await global.mongoose.promise;

  return global.mongoose.conn;
};