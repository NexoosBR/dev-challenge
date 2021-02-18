import { Request, Response } from 'express';

import CreateRequesterService from '@modules/requesters/services/CreateRequesterService';
import RequestersRepository from '../../typeorm/repositories/RequesterRepository';

export default class RequestersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { companyName, cnpj, addresses, phones } = request.body;

    const requestersRepository = new RequestersRepository();

    const createRequester = new CreateRequesterService(requestersRepository);

    const requester = await createRequester.execute({
      companyName,
      cnpj,
      addresses,
      phones,
    });

    return response.status(201).json(requester);
  }

  public async find(request: Request, response: Response): Promise<Response> {
    const { requesterId } = request.params;

    const requestersRepository = new RequestersRepository();

    const requester = await requestersRepository.findById(requesterId);

    return response.json(requester);
  }
}
