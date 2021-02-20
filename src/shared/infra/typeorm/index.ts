import { getConnectionOptions, createConnection, Connection } from 'typeorm'

const connectDB = async (): Promise<Connection> => {
  const options = await getConnectionOptions()

  const connection = await createConnection(options)

  console.log('Database successfully connected')

  return connection
}

export default connectDB
