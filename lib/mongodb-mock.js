// Mock MongoDB Client for Edge compatibility
// This prevents compiling Node-specific TCP/socket dependencies under V8 Edge runtimes.
export class MongoClient {
  constructor() {
    console.warn('MongoDB client is running in mock/edge mode. Outbound TCP connections are skipped.');
  }
  async connect() {
    return this;
  }
  db() {
    return {
      collection: () => ({
        find: () => ({
          toArray: async () => []
        }),
        insertMany: async () => {},
        insertOne: async () => {},
        updateOne: async () => ({ matchedCount: 0 }),
        deleteOne: async () => ({ deletedCount: 0 })
      })
    };
  }
}
