import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1691988421554 implements MigrationInterface {
    name = 'MyMigration1691988421554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    }

}
