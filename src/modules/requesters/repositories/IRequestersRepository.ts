import ICreateRequesterDTO from '../dtos/ICreateRequesterDTO';
import Requester from '../infra/typeorm/entities/Requester';

export default interface IRequestersRepository {
  createAndSave(data: ICreateRequesterDTO): Promise<Requester>;
  findByCnpj(cnpj: string): Promise<Requester | undefined>;
  findById(requesterId: string): Promise<Requester | undefined>;
}
