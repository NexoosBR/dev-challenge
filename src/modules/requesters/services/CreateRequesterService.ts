import AppError from '@shared/errors/AppError';
import validateCNPJ from '@shared/utils/validateCNPJ';
import ICreateRequesterDTO from '../dtos/ICreateRequesterDTO';
import Requester from '../models/Requester';
import IRequestersRepository from '../repositories/IRequestersRepository';

class CreateRequesterService {
  constructor(private requestersRepository: IRequestersRepository) {}

  public async execute({
    address,
    cnpj,
    companyName,
    phone,
  }: ICreateRequesterDTO): Promise<Requester> {
    /**
     * CNPJ validation
     */

    if (!cnpj) throw new AppError(`Requester's CNPJ must be a string`);

    const isCNPJValid = await validateCNPJ(cnpj);

    if (!isCNPJValid) throw new AppError(`Requester's CNPJ is invalid.`);

    const checkCNPJExists = await this.requestersRepository.findByCnpj(cnpj);

    if (checkCNPJExists)
      throw new AppError(`Requester's CNPJ is already taken.`);

    if (!address) throw new AppError(`Requester's address must not be empty.`);

    if (!companyName)
      throw new AppError(`Requester's company name must not be empty.`);

    if (!phone) throw new AppError(`Requester's phone must not be empty.`);

    const requester = await this.requestersRepository.createAndSave({
      address,
      cnpj,
      companyName,
      phone,
    });

    return requester;
  }
}

export default CreateRequesterService;
