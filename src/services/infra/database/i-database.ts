export interface IDatabase {
    connectDB(): Promise<void>
    disconnectDB(): Promise<void>
  }
