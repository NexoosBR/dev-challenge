import connectDB from '../typeorm/index'

import { app } from './app'

const startServer = async () => {
  const PORT = process.env.PORT || '80'

  await connectDB()

  app.listen(PORT, () => console.log(`Server running on ${PORT}.`))
}

startServer()
