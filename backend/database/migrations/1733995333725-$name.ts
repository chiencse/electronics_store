import { MigrationInterface, QueryRunner } from "typeorm";

export class  $name1733995333725 implements MigrationInterface {
    name = ' $name1733995333725'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "orderIdd" int`);
        await queryRunner.query(`ALTER TABLE "order" ADD "address" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "DF_8174eb35667132931ceb6fd8089"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "DF_8174eb35667132931ceb6fd8089" DEFAULT user FOR "roles"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "DF_8174eb35667132931ceb6fd8089"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "DF_8174eb35667132931ceb6fd8089" DEFAULT user_name() FOR "roles"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "orderIdd"`);
    }

}
