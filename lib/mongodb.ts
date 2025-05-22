import mongoose from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var mongoose:
    | {
        conn: mongoose.Connection | null;
        promise: Promise<mongoose.Connection> | null;
      }
    | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI || "";

console.log("uri",process.env.MONGODB_URI)

if (!MONGODB_URI) {
  throw new Error("Please add your MONGODB_URI to .env.local");
}

interface CachedConnection {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

const cached: CachedConnection = global.mongoose || {
  conn: null,
  promise: null,
};

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB(): Promise<mongoose.Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    
    if (mongoose.connection.readyState !== 1) {
      await mongoose.disconnect(); // Close any stale connections
    }

    cached.promise = mongoose.connect(MONGODB_URI,{bufferCommands:false,connectTimeoutMS:20000,serverSelectionTimeoutMS: 20000,}).then((mongoose) => mongoose.connection);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
