import { getRepository, Repository } from 'typeorm';

import ICreateRequesterDTO from '@modules/requesters/dtos/ICreateRequesterDTO';
import IRequestersRepository from '@modules/requesters/repositories/IRequestersRepository';

import Requester from '../entities/Requester';

class RequestersRepository implements IRequestersRepository {
  private ormRepository: Repository<Requester>;

  constructor() {
    this.ormRepository = getRepository(Requester);
  }

  public async createAndSave(
    requesterData: ICreateRequesterDTO,
  ): Promise<Requester> {
    const requester = await this.ormRepository.create(requesterData);

    await this.ormRepository.save(requester);

    return requester;
  }

  public async findByCnpj(cnpj: string): Promise<Requester | undefined> {
    const requester = await this.ormRepository.findOne({
      where: {
        cnpj,
      },
    });

    return requester;
  }
}

export default RequestersRepository;
