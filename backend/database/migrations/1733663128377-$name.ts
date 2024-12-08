import { MigrationInterface, QueryRunner } from "typeorm";

export class  $name1733663128377 implements MigrationInterface {
    name = ' $name1733663128377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_product" DROP COLUMN "orderIdd"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "DF_8174eb35667132931ceb6fd8089"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "DF_8174eb35667132931ceb6fd8089" DEFAULT user FOR "roles"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "DF_8174eb35667132931ceb6fd8089"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "DF_8174eb35667132931ceb6fd8089" DEFAULT user_name() FOR "roles"`);
        await queryRunner.query(`ALTER TABLE "order_product" ADD "orderIdd" int NOT NULL`);
    }

}
