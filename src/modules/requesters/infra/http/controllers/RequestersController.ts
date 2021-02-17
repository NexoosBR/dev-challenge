import FakeRequestersRepository from '@modules/requesters/repositories/fakes/FakeRequestersRepository';
import CreateRequesterService from '@modules/requesters/services/CreateRequesterService';
import { Request, Response } from 'express';

export default class RequestersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { companyName, cnpj, address, phone } = request.body;

    const fakeRequestersRepository = new FakeRequestersRepository();

    const createRequester = new CreateRequesterService(
      fakeRequestersRepository,
    );

    const requester = await createRequester.execute({
      companyName,
      cnpj,
      address,
      phone,
    });

    return response.status(201).json(requester);
  }
}
