import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateLoanRequestsTable1613650576530
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'loan_requests',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'value',
            type: 'decimal',
            precision: 12,
            scale: 2,
          },
          {
            name: 'requesterId',
            type: 'varchar',
            length: '36',
          },
          {
            name: 'loanRequestStatusId',
            type: 'varchar',
            length: '36',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'loan_requests',
      new TableForeignKey({
        name: 'fkLoanRequestRequester',
        columnNames: ['requesterId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'requesters',
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'loan_requests',
      new TableForeignKey({
        name: 'fkLoanRequestStatus',
        columnNames: ['loanRequestStatusId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'loan_requests_status',
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('loan_requests', 'fkLoanRequestRequester');

    await queryRunner.dropForeignKey('loan_requests', 'fkLoanRequestStatus');

    await queryRunner.dropTable('loan_requests');
  }
}
