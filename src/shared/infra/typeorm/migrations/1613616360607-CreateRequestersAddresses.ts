import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateRequesterAddresses1613616360607
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'requesters_addresses',
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
            name: 'address',
            type: 'varchar',
            length: '200',
          },
          {
            name: 'requesterId',
            type: 'varchar',
            length: '36',
            isNullable: true,
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
      'requesters_addresses',
      new TableForeignKey({
        name: 'fkRequestersAddresses',
        columnNames: ['requesterId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'requesters',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'requesters_addresses',
      'fkRequestersAddresses',
    );
    await queryRunner.dropTable('requesters_addresses');
  }
}
