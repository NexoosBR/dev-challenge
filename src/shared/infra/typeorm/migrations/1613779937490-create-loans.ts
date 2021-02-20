import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateLoans1613779937490 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'loans',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid'
          },
          {
            name: 'creditRequestValue',
            type: 'varchar',
            length: '50'
          },
          {
            name: 'status',
            type: 'varchar',
            default: '"pending"'
          },
          {
            name: 'installments',
            type: 'int'
          },
          {
            name: 'interestRate',
            type: 'decimal',
            precision: 2,
            scale: 1
          },
          {
            name: 'loanValue',
            type: 'varchar',
            length: '50'
          },
          {
            name: 'clientId',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'created',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'version',
            type: 'int',
            default: 1
          }
        ],
        foreignKeys: [
          {
            name: 'fk_loans_clients',
            referencedTableName: 'clients',
            referencedColumnNames: ['id'],
            columnNames: ['clientId'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
          }
        ]
      }), true
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('loans')
  }
}
