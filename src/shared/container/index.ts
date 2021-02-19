import { container } from 'tsyringe';

import IRequestersRepository from '@modules/requesters/repositories/IRequestersRepository';
import RequestersRepository from '@modules/requesters/infra/typeorm/repositories/RequesterRepository';

import ILoanRequestsRepository from '@modules/loans/repositories/ILoanRequestsRepository';
import LoanRequestsRepository from '@modules/loans/infra/typeorm/repositories/LoanRequestsRepository';

import ILoanRequestStatusRepository from '@modules/loans/repositories/ILoanRequestStatusRepository';
import LoanRequestStatusRepository from '@modules/loans/infra/typeorm/repositories/LoanRequestStatusRepository';

import ILoansRepository from '@modules/loans/repositories/ILoansRepository';
import LoansRepository from '@modules/loans/infra/typeorm/repositories/LoansRepository';

/**
 * DI Container
 */

container.registerSingleton<IRequestersRepository>(
  'RequestersRepository',
  RequestersRepository,
);

container.registerSingleton<ILoanRequestsRepository>(
  'LoanRequestsRepository',
  LoanRequestsRepository,
);

container.registerSingleton<ILoanRequestStatusRepository>(
  'LoanRequestStatusRepository',
  LoanRequestStatusRepository,
);

container.registerSingleton<ILoansRepository>(
  'LoansRepository',
  LoansRepository,
);
