import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migration1613788029448 implements MigrationInterface {
    name = 'Migration1613788029448'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP INDEX `UNIQUE` ON `company`')
      await queryRunner.query('ALTER TABLE `company` DROP COLUMN `cnpj`')
      await queryRunner.query('ALTER TABLE `company` ADD `cnpj` varchar(14) NOT NULL')
      await queryRunner.query('ALTER TABLE `company` ADD UNIQUE INDEX `IDX_b55d9c6e6adfa3c6de735c5a2e` (`cnpj`)')
      await queryRunner.query('ALTER TABLE `company_address` CHANGE `number` `number` int(11) NOT NULL')
      await queryRunner.query('ALTER TABLE `credit_request` CHANGE `value` `value` float(8,2) NOT NULL')
      await queryRunner.query('ALTER TABLE `loan` DROP FOREIGN KEY `FK_98e7adb49316ccebf6eef27f1a4`')
      await queryRunner.query('ALTER TABLE `loan` CHANGE `creditRequestId` `creditRequestId` varchar(36) NOT NULL')
      await queryRunner.query('ALTER TABLE `loan` ADD UNIQUE INDEX `IDX_98e7adb49316ccebf6eef27f1a` (`creditRequestId`)')
      await queryRunner.query('ALTER TABLE `loan` CHANGE `interestRate` `interestRate` float(8,2) NOT NULL')
      await queryRunner.query('ALTER TABLE `loan` CHANGE `numberOfInstallments` `numberOfInstallments` int(3) NOT NULL')
      await queryRunner.query('CREATE UNIQUE INDEX `UNIQUE` ON `company` (`cnpj`)')
      await queryRunner.query('CREATE UNIQUE INDEX `REL_98e7adb49316ccebf6eef27f1a` ON `loan` (`creditRequestId`)')
      await queryRunner.query('ALTER TABLE `loan` ADD CONSTRAINT `FK_98e7adb49316ccebf6eef27f1a4` FOREIGN KEY (`creditRequestId`) REFERENCES `credit_request`(`creditRequestId`) ON DELETE NO ACTION ON UPDATE NO ACTION')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE `loan` DROP FOREIGN KEY `FK_98e7adb49316ccebf6eef27f1a4`')
      await queryRunner.query('DROP INDEX `REL_98e7adb49316ccebf6eef27f1a` ON `loan`')
      await queryRunner.query('DROP INDEX `UNIQUE` ON `company`')
      await queryRunner.query('ALTER TABLE `loan` CHANGE `numberOfInstallments` `numberOfInstallments` int NOT NULL')
      await queryRunner.query('ALTER TABLE `loan` CHANGE `interestRate` `interestRate` float(16,2) NOT NULL')
      await queryRunner.query('ALTER TABLE `loan` DROP INDEX `IDX_98e7adb49316ccebf6eef27f1a`')
      await queryRunner.query('ALTER TABLE `loan` CHANGE `creditRequestId` `creditRequestId` varchar(36) NOT NULL')
      await queryRunner.query('ALTER TABLE `loan` ADD CONSTRAINT `FK_98e7adb49316ccebf6eef27f1a4` FOREIGN KEY (`creditRequestId`) REFERENCES `credit_request`(`creditRequestId`) ON DELETE NO ACTION ON UPDATE NO ACTION')
      await queryRunner.query('ALTER TABLE `credit_request` CHANGE `value` `value` float(16,2) NOT NULL')
      await queryRunner.query('ALTER TABLE `company_address` CHANGE `number` `number` int NOT NULL')
      await queryRunner.query('ALTER TABLE `company` DROP INDEX `IDX_b55d9c6e6adfa3c6de735c5a2e`')
      await queryRunner.query('ALTER TABLE `company` DROP COLUMN `cnpj`')
      await queryRunner.query('ALTER TABLE `company` ADD `cnpj` varchar(18) NOT NULL')
      await queryRunner.query('CREATE UNIQUE INDEX `UNIQUE` ON `company` (`cnpj`)')
    }
}
