import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateRequestersTable1613524278071
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'requesters',
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
            name: 'companyName',
            type: 'varchar',
            length: '150',
          },
          {
            name: 'address',
            type: 'varchar',
            length: '200',
          },
          {
            name: 'cnpj',
            type: 'varchar',
            length: '14',
          },
          {
            name: 'phone',
            type: 'varchar',
            length: '15',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('requesters');
  }
}
