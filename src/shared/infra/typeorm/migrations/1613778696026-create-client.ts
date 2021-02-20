import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateClient1613778696026 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'clients',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid'
          },
          {
            name: 'companyName',
            type: 'varchar',
            length: '50'
          },
          {
            name: 'cnpj',
            type: 'varchar',
            length: '50',
            isUnique: true
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
        ]
      }), true
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('clients')
  }
}
