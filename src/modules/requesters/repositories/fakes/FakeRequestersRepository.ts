import { uuid } from 'uuidv4';

import ICreateRequesterDTO from '@modules/requesters/dtos/ICreateRequesterDTO';
import Requester from '@modules/requesters/models/Requester';
import IRequestersRepository from '../IRequestersRepository';

class FakeRequestersRepository implements IRequestersRepository {
  private requesters: Requester[] = [];

  public async createAndSave({
    address,
    cnpj,
    companyName,
    phone,
  }: ICreateRequesterDTO): Promise<Requester> {
    const requester = new Requester();

    Object.assign(requester, {
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      address,
      cnpj,
      companyName,
      phone,
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
}

export default FakeRequestersRepository;
