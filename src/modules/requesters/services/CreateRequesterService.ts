import AppError from '@shared/errors/AppError';
import validateCNPJ from '@shared/utils/validateCNPJ';
import ICreateRequesterDTO from '../dtos/ICreateRequesterDTO';
import Requester from '../infra/typeorm/entities/Requester';
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

    const isCNPJValid = validateCNPJ(cnpj);

    if (!isCNPJValid) throw new AppError(`Requester's CNPJ is invalid.`);

    const formattedCNPJ: string = cnpj.replace(/[^\d]+/g, '');

    const checkCNPJExists = await this.requestersRepository.findByCnpj(
      formattedCNPJ,
    );

    if (checkCNPJExists)
      throw new AppError(`Requester's CNPJ is already taken.`);

    /**
     * Address validation
     */
    if (!address) throw new AppError(`Requester's address must not be empty.`);

    /**
     * Company name validation
     */
    if (!companyName)
      throw new AppError(`Requester's company name must not be empty.`);

    /**
     * Phone validation
     */
    if (!phone) throw new AppError(`Requester's phone must not be empty.`);

    const requester = await this.requestersRepository.createAndSave({
      address,
      cnpj: formattedCNPJ,
      companyName,
      phone,
    });

    return requester;
  }
}

export default CreateRequesterService;
