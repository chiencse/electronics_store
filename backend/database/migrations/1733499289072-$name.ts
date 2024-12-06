import { MigrationInterface, QueryRunner } from "typeorm";

export class  $name1733499289072 implements MigrationInterface {
    name = ' $name1733499289072'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar"`);
        await queryRunner.query(`ALTER TABLE "cart_product" ADD "variantId" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "totalPrice" int NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "DF_8174eb35667132931ceb6fd8089"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "DF_8174eb35667132931ceb6fd8089" DEFAULT user FOR "roles"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "DF_8174eb35667132931ceb6fd8089"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "DF_8174eb35667132931ceb6fd8089" DEFAULT user_name() FOR "roles"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "totalPrice"`);
        await queryRunner.query(`ALTER TABLE "cart_product" DROP COLUMN "variantId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "avatar" nvarchar(500)`);
    }

}
