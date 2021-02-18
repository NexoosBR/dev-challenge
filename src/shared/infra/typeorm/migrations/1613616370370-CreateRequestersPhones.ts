import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateRequesterPhones1613616370370
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'requesters_phones',
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
            name: 'phone',
            type: 'varchar',
            length: '15',
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
      'requesters_phones',
      new TableForeignKey({
        name: 'fkRequestersPhones',
        columnNames: ['requesterId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'requesters',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('requesters_phones', 'fkRequestersPhones');
    await queryRunner.dropTable('requesters_phones');
  }
}
