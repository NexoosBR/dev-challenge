import ICreateRequesterDTO from '../dtos/ICreateRequesterDTO';
import Requester from '../models/Requester';

export default interface IRequestersRepository {
  createAndSave(data: ICreateRequesterDTO): Promise<Requester>;
  findByCnpj(cnpj: string): Promise<Requester | undefined>;
}
