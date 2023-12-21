import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDescriptionColumn1703184248180 implements MigrationInterface {
    name = 'AddDescriptionColumn1703184248180'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "description" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "description"`);
    }

}
