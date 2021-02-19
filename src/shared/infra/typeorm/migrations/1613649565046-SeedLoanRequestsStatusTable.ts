import LoanRequestStatus from '@modules/loans/infra/typeorm/entities/LoanRequestStatus';
import { MigrationInterface, QueryRunner } from 'typeorm';

export default class SeedLoanRequestsStatusTable1613649565046
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const PENDING_STATUS = new LoanRequestStatus();
    PENDING_STATUS.status = 'pending';
    PENDING_STATUS.description = 'Loan request is pending of approval.';

    const DISAPPROVED_STATUS = new LoanRequestStatus();
    DISAPPROVED_STATUS.status = 'disapproved';
    DISAPPROVED_STATUS.description = 'Loan request is disapproved.';

    const APPROVED_STATUS = new LoanRequestStatus();
    APPROVED_STATUS.status = 'approved';
    APPROVED_STATUS.description = 'Loan request is approved.';

    await queryRunner.manager.save(PENDING_STATUS);
    await queryRunner.manager.save(DISAPPROVED_STATUS);
    await queryRunner.manager.save(APPROVED_STATUS);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM `loan_requests_status`;');
  }
}
