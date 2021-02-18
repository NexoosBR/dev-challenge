import AppError from '@shared/errors/AppError';
import FakeRequestersRepository from '../repositories/fakes/FakeRequestersRepository';
import CreateRequesterService from './CreateRequesterService';

let fakeRequestersRepository: FakeRequestersRepository;

let createRequester: CreateRequesterService;

describe('CreateRequesterService', () => {
  beforeEach(() => {
    fakeRequestersRepository = new FakeRequestersRepository();

    createRequester = new CreateRequesterService(fakeRequestersRepository);
  });

  it('should be able to create a new requester', async () => {
    const requester = await createRequester.execute({
      addresses: [
        'R. Cláudio Soares, 72 - Pinheiros, São Paulo - SP, 05422-030',
      ],
      cnpj: '23.265.773/0001-03',
      companyName: 'Nexoos',
      phones: ['1149495929'],
    });

    expect(requester).toHaveProperty('id');
  });

  it('should not be able to create a new requester if CNPJ is falsy', async () => {
    await expect(
      createRequester.execute({
        addresses: [
          'R. Cláudio Soares, 72 - Pinheiros, São Paulo - SP, 05422-030',
        ],
        cnpj: (undefined as unknown) as string,
        companyName: 'Nexoos',
        phones: ['1149495929'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new requester with invalid CNPJ', async () => {
    await expect(
      createRequester.execute({
        addresses: [
          'R. Cláudio Soares, 72 - Pinheiros, São Paulo - SP, 05422-030',
        ],
        cnpj: '00.000.000/0000-00',
        companyName: 'Nexoos',
        phones: ['1149495929'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should no be able to create a new requester if its CNPJ is being used by another requester', async () => {
    await createRequester.execute({
      addresses: [
        'R. Cláudio Soares, 72 - Pinheiros, São Paulo - SP, 05422-030',
      ],
      cnpj: '23.265.773/0001-03',
      companyName: 'Nexoos',
      phones: ['1149495929'],
    });

    await expect(
      createRequester.execute({
        addresses: ['Outro endereço'],
        cnpj: '23.265.773/0001-03',
        companyName: 'Nexoos 2',
        phones: ['1149495929'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new requester without company name', async () => {
    await expect(
      createRequester.execute({
        addresses: [
          'R. Cláudio Soares, 72 - Pinheiros, São Paulo - SP, 05422-030',
        ],
        cnpj: '23.265.773/0001-03',
        companyName: '',
        phones: ['1149495929'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new requester without any address', async () => {
    await expect(
      createRequester.execute({
        addresses: [],
        cnpj: '23.265.773/0001-03',
        companyName: 'Nexoos',
        phones: ['1149495929'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new requester with any invalid address', async () => {
    await expect(
      createRequester.execute({
        addresses: [
          'R. Cláudio Soares, 72 - Pinheiros, São Paulo - SP, 05422-030',
          '',
        ],
        cnpj: '23.265.773/0001-03',
        companyName: 'Nexoos',
        phones: ['1149495929'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new requester without any phone number', async () => {
    await expect(
      createRequester.execute({
        addresses: [
          'R. Cláudio Soares, 72 - Pinheiros, São Paulo - SP, 05422-030',
        ],
        cnpj: '23.265.773/0001-03',
        companyName: 'Nexoos',
        phones: [],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new requester with any invalid phone number', async () => {
    await expect(
      createRequester.execute({
        addresses: [
          'R. Cláudio Soares, 72 - Pinheiros, São Paulo - SP, 05422-030',
        ],
        cnpj: '23.265.773/0001-03',
        companyName: 'Nexoos',
        phones: ['1149495929', ''],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
