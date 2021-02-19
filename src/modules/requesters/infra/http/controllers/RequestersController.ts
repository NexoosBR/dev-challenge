import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateRequesterService from '@modules/requesters/services/CreateRequesterService';
import FindRequesterService from '@modules/requesters/services/FindRequesterService';
import RequestersRepository from '../../typeorm/repositories/RequesterRepository';

export default class RequestersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { companyName, cnpj, addresses, phones } = request.body;

    const createRequester = container.resolve(CreateRequesterService);

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

    const findRequester = container.resolve(FindRequesterService);

    const requester = await findRequester.execute(requesterId);

    return response.json(requester);
  }
}
