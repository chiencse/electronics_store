import { MigrationInterface, QueryRunner } from "typeorm";

export class  $name1734060342435 implements MigrationInterface {
    name = ' $name1734060342435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "discount" ADD "discountType" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "discount" ADD "valueMax" int NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "DF_8174eb35667132931ceb6fd8089"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "DF_8174eb35667132931ceb6fd8089" DEFAULT user FOR "roles"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "DF_8174eb35667132931ceb6fd8089"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "DF_8174eb35667132931ceb6fd8089" DEFAULT user_name() FOR "roles"`);
        await queryRunner.query(`ALTER TABLE "discount" DROP COLUMN "valueMax"`);
        await queryRunner.query(`ALTER TABLE "discount" DROP COLUMN "discountType"`);
    }

}
