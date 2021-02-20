import request from 'supertest';
import { Connection, getConnection } from 'typeorm';
import { TransactionalTestContext } from 'typeorm-transactional-tests';

import app from '@shared/infra/http/server';
import connect from '@shared/infra/typeorm';

let connection: Connection;
let transactionalContext: TransactionalTestContext;

let registeredRequesterId: string;

describe("Testing Requester's routes", () => {
  beforeAll(async () => {
    await connect();
    connection = getConnection();
    transactionalContext = new TransactionalTestContext(connection);
    await transactionalContext.start();
  });

  it('POST /requesters - success', async () => {
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

    registeredRequesterId = body.id;

    expect(body).toHaveProperty('id');
  });

  it('POST /requesters - fail', async () => {
    const { body } = await request(app)
      .post('/requesters')
      .send({
        cnpj: '',
        companyName: '',
        addresses: [1],
        phones: ['114'],
      });

    expect(body).toHaveProperty('status');
    expect(body).toHaveProperty('message');
    expect(body.status).toEqual('error');
  });

  it('GET /requesters/:registeredRequester - success', async () => {
    const { body } = await request(app).get(
      `/requesters/${registeredRequesterId}`,
    );

    expect(body).toHaveProperty('id');
    expect(body.id).toEqual(registeredRequesterId);
  });

  it('GET /requesters/:registeredRequester - fail', async () => {
    const { body } = await request(app).get(`/requesters/any-other-id`);

    expect(body).toHaveProperty('status');
    expect(body).toHaveProperty('message');
    expect(body.status).toEqual('error');
  });

  afterAll(async () => {
    await transactionalContext.finish();
  });
});
