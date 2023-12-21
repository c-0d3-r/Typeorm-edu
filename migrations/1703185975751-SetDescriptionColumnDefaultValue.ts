import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetDescriptionColumnDefaultValue1703185975751
  implements MigrationInterface
{
  name = 'SetDescriptionColumnDefaultValue1703185975751';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "description"`);
    await queryRunner.query(
      ` ALTER TABLE "product" ADD COLUMN "description" character varying DEFAULT '';`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "description" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "description" DROP NOT NULL`,
    );
  }
}
