import "server-only";
import mongoose from "mongoose";
import { getEnv } from "@/server/env";

/**
 * Reusable Mongoose connection.
 *
 * Serverless functions and Next dev hot reloads would otherwise open a new
 * pool per request/module reload, so the promise is cached on globalThis.
 */
type MongooseCache = {
  promise: Promise<typeof mongoose> | null;
};

const globalForMongoose = globalThis as typeof globalThis & {
  __mongoose?: MongooseCache;
};

const cache: MongooseCache = globalForMongoose.__mongoose ?? { promise: null };
globalForMongoose.__mongoose = cache;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (!cache.promise) {
    const { MONGODB_URI } = getEnv();

    // Fail fast instead of buffering queries while disconnected.
    mongoose.set("bufferCommands", false);
    // Reject unknown filter keys rather than silently matching everything.
    mongoose.set("strictQuery", true);

    cache.promise = mongoose
      .connect(MONGODB_URI, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 10_000,
      })
      .catch((error: unknown) => {
        // Allow the next request to retry after a failed connection.
        cache.promise = null;
        throw error;
      });
  }

  return cache.promise;
}
