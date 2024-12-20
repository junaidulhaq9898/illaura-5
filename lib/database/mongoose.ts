import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Extend the global type to include `mongoose` connection caching
declare global {
  namespace NodeJS {
    interface Global {
      mongoose: MongooseConnection | undefined;
    }
  }
}

declare const global: NodeJS.Global;

// Initialize the cached connection variable
const cached: MongooseConnection = global.mongoose || { conn: null, promise: null };

// Ensure `global.mongoose` is initialized
if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async (): Promise<Mongoose> => {
  if (cached.conn) {
    return cached.conn; // Return the existing connection
  }

  if (!MONGODB_URL) {
    throw new Error("Missing MONGODB_URL"); // Ensure the environment variable is defined
  }

  if (!cached.promise) {
    // Create a new connection promise
    cached.promise = mongoose
      .connect(MONGODB_URL, {
        dbName: "imaginify",
        bufferCommands: false, // Prevent Mongoose from buffering commands
      })
      .then((mongooseInstance) => mongooseInstance); // Resolve the Mongoose instance
  }

  cached.conn = await cached.promise; // Wait for the connection promise to resolve
  return cached.conn; // Return the established connection
};