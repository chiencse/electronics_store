import { MigrationInterface, QueryRunner } from "typeorm";

export class  $name1734013653668 implements MigrationInterface {
    name = ' $name1734013653668'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "requiredDate"`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "shippedDate" datetime`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "comments" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "DF_8174eb35667132931ceb6fd8089"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "DF_8174eb35667132931ceb6fd8089" DEFAULT user FOR "roles"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "DF_8174eb35667132931ceb6fd8089"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "DF_8174eb35667132931ceb6fd8089" DEFAULT user_name() FOR "roles"`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "comments" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "shippedDate" datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "requiredDate" datetime NOT NULL`);
    }

}
