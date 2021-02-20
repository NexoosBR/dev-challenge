import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreatePhones1613780608003 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'phones',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid'
          },
          {
            name: 'phoneNumber',
            type: 'varchar',
            length: '20'
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
            name: 'fk_phones_clients',
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
    await queryRunner.dropTable('phones')
  }
}
