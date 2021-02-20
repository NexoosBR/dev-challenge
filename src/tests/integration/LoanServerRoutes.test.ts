import request from 'supertest';
import { Connection, getConnection } from 'typeorm';
import { TransactionalTestContext } from 'typeorm-transactional-tests';

import app from '@shared/infra/http/server';
import connect from '@shared/infra/typeorm';
import Requester from '@modules/requesters/infra/typeorm/entities/Requester';
import LoanRequest from '@modules/loans/infra/typeorm/entities/LoanRequest';

let connection: Connection;
let transactionalContext: TransactionalTestContext;

let requester: Requester;
let loanRequest: LoanRequest;

let registeredLoanId: string;

describe('Testing Loan routes', () => {
  beforeAll(async () => {
    await connect();
    connection = getConnection();
    transactionalContext = new TransactionalTestContext(connection);
    await transactionalContext.start();

    // creates requester
    const { body: requesterBody } = await request(app)
      .post('/requesters')
      .send({
        cnpj: '63.770.683/0001-86',
        companyName: 'Nexoos 1000',
        addresses: [
          'R. Cláudio Soares, 72 - Pinheiros, São Paulo - SP, 05422-030',
        ],
        phones: ['1149495929'],
      });
    requester = requesterBody;

    const { body: loanRequestBody } = await request(app)
      .post('/loan-requests')
      .send({
        value: 100000,
        requesterId: requester.id,
      });
    loanRequest = loanRequestBody;
  });

  it('POST /loans - success', async () => {
    const { body } = await request(app).post('/loans').send({
      expirationDay: 5,
      term: 12,
      interestRate: 1.5,
      loanRequestId: loanRequest.id,
    });

    registeredLoanId = body.id;

    expect(body).toHaveProperty('id');
  });

  it('POST /loans - fail', async () => {
    const { body } = await request(app).post('/loans').send({
      expirationDay: 40,
      term: 0,
      interestRate: 0,
      loanRequestId: 'any-other-loan-request-id',
    });

    expect(body).toHaveProperty('status');
    expect(body).toHaveProperty('message');
    expect(body.status).toEqual('error');
  });

  it('GET /loans/:registeredLoanId - success', async () => {
    const { body } = await request(app).get(`/loans/${registeredLoanId}`);

    expect(body).toHaveProperty('id');
    expect(body.id).toEqual(registeredLoanId);
  });

  it('GET /loans/:registeredRequester - fail', async () => {
    const { body } = await request(app).get(`/loans/any-other-id`);

    expect(body).toHaveProperty('status');
    expect(body).toHaveProperty('message');
    expect(body.status).toEqual('error');
  });

  afterAll(async () => {
    await transactionalContext.finish();
  });
});
