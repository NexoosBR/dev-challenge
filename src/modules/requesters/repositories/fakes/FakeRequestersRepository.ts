import { v4 as uuidv4 } from 'uuid';

import ICreateRequesterDTO from '@modules/requesters/dtos/ICreateRequesterDTO';
import Requester from '@modules/requesters/infra/typeorm/entities/Requester';
import IRequestersRepository from '../IRequestersRepository';

class FakeRequestersRepository implements IRequestersRepository {
  private requesters: Requester[] = [];

  public async createAndSave({
    addresses,
    cnpj,
    companyName,
    phones,
  }: ICreateRequesterDTO): Promise<Requester> {
    const requester = new Requester();

    Object.assign(requester, {
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      addresses,
      cnpj,
      companyName,
      phones,
    });

    this.requesters.push(requester);

    return requester;
  }

  public async findByCnpj(cnpj: string): Promise<Requester | undefined> {
    const requesterFound = this.requesters.find(
      requester => requester.cnpj === cnpj,
    );

    return requesterFound;
  }

  public async findById(requesterId: string): Promise<Requester | undefined> {
    const requesterFound = this.requesters.find(
      requester => requester.id === requesterId,
    );

    return requesterFound;
  }
}

export default FakeRequestersRepository;
