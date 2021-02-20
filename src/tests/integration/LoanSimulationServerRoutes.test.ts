import request from 'supertest';
import { Connection, getConnection } from 'typeorm';
import { TransactionalTestContext } from 'typeorm-transactional-tests';

import app from '@shared/infra/http/server';
import connect from '@shared/infra/typeorm';

let connection: Connection;
let transactionalContext: TransactionalTestContext;

describe('Testing Loan Simulation routes', () => {
  beforeAll(async () => {
    await connect();
    connection = getConnection();
    transactionalContext = new TransactionalTestContext(connection);
    await transactionalContext.start();
  });

  it('POST /loan-simulation - success', async () => {
    const { body } = await request(app).post('/loan-simulation').send({
      expirationDay: 10,
      term: 12,
      interestRate: 1.5,
      value: 100000,
    });

    expect(body).toHaveProperty('loanInstallments');
    expect(body.loanInstallments).toHaveLength(12);
  });

  it('POST /loan-simulation - fail', async () => {
    const { body } = await request(app).post('/loan-simulation').send({
      expirationDay: 40,
      term: 0,
      interestRate: 0,
      value: -10,
    });

    expect(body).toHaveProperty('status');
    expect(body).toHaveProperty('message');
    expect(body.status).toEqual('error');
  });

  afterAll(async () => {
    await transactionalContext.finish();
  });
});
