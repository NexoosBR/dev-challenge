import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateAddress1613780615281 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'addresses',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isUnique: true,
            generationStrategy: 'uuid'
          },
          {
            name: 'zipCode',
            type: 'varchar',
            length: '10'
          },
          {
            name: 'address',
            type: 'varchar',
            length: '100'
          },
          {
            name: 'addressNumber',
            type: 'int'
          },
          {
            name: 'complement',
            type: 'varchar',
            length: '50',
            isNullable: true
          },
          {
            name: 'district',
            type: 'varchar',
            length: '50'
          },
          {
            name: 'city',
            type: 'varchar',
            length: '20'
          },
          {
            name: 'state',
            type: 'varchar',
            length: '30'
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
            name: 'fk_addresses_clients',
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
    await queryRunner.dropTable('addresses')
  }
}
