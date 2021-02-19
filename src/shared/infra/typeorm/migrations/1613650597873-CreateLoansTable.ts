import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateLoansTable1613650597873
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'loans',
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
            name: 'totalValue',
            type: 'decimal',
            precision: 12,
            scale: 2,
          },
          {
            name: 'term',
            type: 'integer',
          },
          {
            name: 'interestRate',
            type: 'decimal',
            precision: 12,
            scale: 2,
          },
          {
            name: 'expirationDay',
            type: 'integer',
          },
          {
            name: 'loanRequestId',
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
      'loans',
      new TableForeignKey({
        name: 'fkLoanXLoanRequest',
        columnNames: ['loanRequestId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'loan_requests',
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('loans', 'fkLoanXLoanRequest');

    await queryRunner.dropTable('requesters_addresses');
  }
}
