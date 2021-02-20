import request from 'supertest';
import { Connection, getConnection } from 'typeorm';
import { TransactionalTestContext } from 'typeorm-transactional-tests';

import app from '@shared/infra/http/server';
import connect from '@shared/infra/typeorm';
import Requester from '@modules/requesters/infra/typeorm/entities/Requester';

let connection: Connection;
let transactionalContext: TransactionalTestContext;

let requester: Requester;
let registeredLoanRequestId: string;

describe("Testing Loan's Requester routes", () => {
  beforeAll(async () => {
    await connect();
    connection = getConnection();
    transactionalContext = new TransactionalTestContext(connection);
    await transactionalContext.start();

    // creates requester
    const { body } = await request(app)
      .post('/requesters')
      .send({
        cnpj: '63.770.683/0001-86',
        companyName: 'Nexoos 1000',
        addresses: [
          'R. Cláudio Soares, 72 - Pinheiros, São Paulo - SP, 05422-030',
        ],
        phones: ['1149495929'],
      });
    requester = body;
  });

  it('POST /loan-requests - success', async () => {
    const { body } = await request(app).post('/loan-requests').send({
      value: 100000,
      requesterId: requester.id,
    });

    registeredLoanRequestId = body.id;

    expect(body).toHaveProperty('id');
  });

  it('POST /loan-requests - fail', async () => {
    const { body } = await request(app).post('/loan-requests').send({
      value: 100000,
      requesterId: 'any-other-requester',
    });

    expect(body).toHaveProperty('status');
    expect(body).toHaveProperty('message');
    expect(body.status).toEqual('error');
  });

  it('GET /loan-requests/:registeredLoanRequest - success', async () => {
    const { body } = await request(app).get(
      `/loan-requests/${registeredLoanRequestId}`,
    );

    expect(body).toHaveProperty('id');
    expect(body.id).toEqual(registeredLoanRequestId);
  });

  it('GET /loan-requests/:registeredRequester - fail', async () => {
    const { body } = await request(app).get(`/loan-requests/any-other-id`);

    expect(body).toHaveProperty('status');
    expect(body).toHaveProperty('message');
    expect(body.status).toEqual('error');
  });

  afterAll(async () => {
    await transactionalContext.finish();
  });
});
