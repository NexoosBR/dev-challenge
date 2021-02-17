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
      address: 'R. Cláudio Soares, 72 - Pinheiros, São Paulo - SP, 05422-030',
      cnpj: '23.265.773/0001-03',
      companyName: 'Nexoos',
      phone: '1149495929',
    });

    expect(requester).toHaveProperty('id');
  });

  it('should not be able to create a new requester with invalid CNPJ', async () => {
    await expect(
      createRequester.execute({
        address: 'R. Cláudio Soares, 72 - Pinheiros, São Paulo - SP, 05422-030',
        cnpj: '00.000.000/0000-00',
        companyName: 'Nexoos',
        phone: '1149495929',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should no be able to create a new requester if its CNPJ is being used by another requester', async () => {
    await createRequester.execute({
      address: 'R. Cláudio Soares, 72 - Pinheiros, São Paulo - SP, 05422-030',
      cnpj: '23.265.773/0001-03',
      companyName: 'Nexoos',
      phone: '1149495929',
    });

    await expect(
      createRequester.execute({
        address: 'Outro endereço',
        cnpj: '23.265.773/0001-03',
        companyName: 'Nexoos 2',
        phone: '1149495929',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new requester without address', async () => {
    await expect(
      createRequester.execute({
        address: '',
        cnpj: '23.265.773/0001-03',
        companyName: 'Nexoos',
        phone: '1149495929',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new requester without company name', async () => {
    await expect(
      createRequester.execute({
        address: 'R. Cláudio Soares, 72 - Pinheiros, São Paulo - SP, 05422-030',
        cnpj: '23.265.773/0001-03',
        companyName: '',
        phone: '1149495929',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new requester without phone number', async () => {
    await expect(
      createRequester.execute({
        address: 'R. Cláudio Soares, 72 - Pinheiros, São Paulo - SP, 05422-030',
        cnpj: '23.265.773/0001-03',
        companyName: 'Nexoos',
        phone: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
