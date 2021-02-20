import {
  createConnection,
  createConnections,
  getConnectionOptions,
} from 'typeorm';

createConnections();

async function connect(): Promise<void> {
  const connectionOptions = await getConnectionOptions();

  await createConnection(connectionOptions);
}

export default connect;
