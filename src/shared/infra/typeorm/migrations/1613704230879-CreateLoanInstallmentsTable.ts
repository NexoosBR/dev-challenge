import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateLoanInstallmentsTable1613704230879
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'loan_installments',
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
            name: 'paid',
            type: 'integer',
          },
          {
            name: 'expirationDate',
            type: 'DATE',
          },
          {
            name: 'paidAt',
            type: 'DATE',
            isNullable: true,
          },
          {
            name: 'loanId',
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
      'loan_installments',
      new TableForeignKey({
        name: 'fkLoanInstallmentXLoan',
        columnNames: ['loanId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'loans',
        onDelete: 'NO ACTION',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'loan_installments',
      'fkLoanInstallmentXLoan',
    );

    await queryRunner.dropTable('loan_installments');
  }
}
