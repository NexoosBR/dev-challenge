import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IRequestersRepository from '../repositories/IRequestersRepository';
import Requester from '../infra/typeorm/entities/Requester';

@injectable()
class FindRequesterService {
  constructor(
    @inject('RequestersRepository')
    private requestersRepository: IRequestersRepository,
  ) {}

  public async execute(requesterId: string): Promise<Requester> {
    const requester = await this.requestersRepository.findById(requesterId);

    if (!requester) throw new AppError('Requester was not found', 404);

    return requester;
  }
}

export default FindRequesterService;
