import request from 'supertest'
import { Connection } from 'typeorm'
import { TransactionalTestContext } from 'typeorm-transactional-tests'

import { IClientDTO } from '../../../src/modules/clients/dtos/client.dto'
import { clientRouter } from '../../../src/modules/clients/infra/http/routers/client.router'
import { app } from '../../../src/shared/infra/http/app'
import connectDB from '../../../src/shared/infra/typeorm'

describe('INTEGRAÇÃO | Create a Client Controller', () => {
  let clientData: IClientDTO

  let transactionalContext: TransactionalTestContext
  let connection: Connection

  beforeAll(async () => {
    console.log('INICIOU TRANSACTION')

    connection = await connectDB()

    transactionalContext = new TransactionalTestContext(connection)
    await transactionalContext.start()

    app.use('/clients', clientRouter)

    clientData = {
      companyName: 'Samuel Sabino S.A.',
      cnpj: '41630563000140',
      address: [
        {
          zipCode: '12345321',
          address: 'Avenida Teste',
          addressNumber: 101,
          complement: 'apt 32',
          district: 'Centro',
          city: 'Teste City',
          state: 'Tester'
        }
      ],
      phone: [{ phoneNumber: '940028922' }]
    }
  })

  it('Quando eu cadastro um produto com sucesso via request (statusCode 200).', async () => {
    const result = await request(app).post('/clients').send(clientData)

    expect(result.status).toBe(200)
  })

  afterAll(async () => {
    await transactionalContext.finish()

    console.log('FINALIZOU TRANSACTION')
  })
})
