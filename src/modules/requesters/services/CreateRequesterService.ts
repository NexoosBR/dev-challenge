import AppError from '@shared/errors/AppError';
import validateCNPJ from '@shared/utils/validateCNPJ';
import Requester from '../infra/typeorm/entities/Requester';
import RequesterAddress from '../infra/typeorm/entities/RequesterAddress';
import RequesterPhone from '../infra/typeorm/entities/RequesterPhone';
import IRequestersRepository from '../repositories/IRequestersRepository';

interface IRequest {
  companyName: string;
  cnpj: string;
  addresses: string[];
  phones: string[];
}

class CreateRequesterService {
  constructor(private requestersRepository: IRequestersRepository) {}

  public async execute({
    addresses,
    cnpj,
    companyName,
    phones,
  }: IRequest): Promise<Requester> {
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
     * Company name validation
     */
    if (!companyName)
      throw new AppError(`Requester's company name must not be empty.`);

    /**
     * Address validation
     */
    if (!addresses || !Array.isArray(addresses) || addresses.length < 1)
      throw new AppError(`Requester's addresses must not be empty.`);

    const requesterAddresses = addresses.map(address => {
      if (!address) throw new AppError('Address is invalid.');
      const requesterAddress = new RequesterAddress();
      requesterAddress.address = address;

      return requesterAddress;
    });

    /**
     * Phone validation
     */
    if (!phones || !Array.isArray(phones) || phones.length < 1)
      throw new AppError(`Requester's phones must not be empty.`);

    const requesterPhones = phones.map(phone => {
      if (!phone) throw new AppError('Phone number is invalid.');
      const requesterAddress = new RequesterPhone();
      requesterAddress.phone = phone;

      return requesterAddress;
    });

    const requester = await this.requestersRepository.createAndSave({
      addresses: requesterAddresses,
      cnpj: formattedCNPJ,
      companyName,
      phones: requesterPhones,
    });

    return requester;
  }
}

export default CreateRequesterService;
