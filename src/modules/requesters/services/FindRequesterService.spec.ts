import AppError from '@shared/errors/AppError';
import FakeRequestersRepository from '../repositories/fakes/FakeRequestersRepository';
import FindRequesterService from './FindRequesterService';

let fakeRequestersRepository: FakeRequestersRepository;

let findRequester: FindRequesterService;

describe('FindRequesterService', () => {
  beforeEach(() => {
    fakeRequestersRepository = new FakeRequestersRepository();

    findRequester = new FindRequesterService(fakeRequestersRepository);
  });

  it('should return a requester from repository with provided ID', async () => {
    const registeredRequester = await fakeRequestersRepository.createAndSave({
      addresses: [],
      cnpj: '23265773000103',
      companyName: 'Nexoos',
      phones: [],
    });

    const requester = await findRequester.execute(registeredRequester.id);

    expect(requester.id).toEqual(registeredRequester.id);
  });

  it('should return an error message if requester was not found', async () => {
    await expect(
      findRequester.execute('any-inexistent-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
