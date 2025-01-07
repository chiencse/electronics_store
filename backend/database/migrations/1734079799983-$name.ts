import { MigrationInterface, QueryRunner } from "typeorm";

export class  $name1734079799983 implements MigrationInterface {
    name = ' $name1734079799983'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order_discount_discount" ("orderId" uniqueidentifier NOT NULL, "discountId" uniqueidentifier NOT NULL, CONSTRAINT "PK_a7cc14f0e70417cd52f0166fbd2" PRIMARY KEY ("orderId", "discountId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_be4cc974af393b5cd0a2d0778f" ON "order_discount_discount" ("orderId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7c405625c644e8408ae5bd278f" ON "order_discount_discount" ("discountId") `);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "DF_8174eb35667132931ceb6fd8089"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "DF_8174eb35667132931ceb6fd8089" DEFAULT user FOR "roles"`);
        await queryRunner.query(`ALTER TABLE "order_discount_discount" ADD CONSTRAINT "FK_be4cc974af393b5cd0a2d0778f8" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order_discount_discount" ADD CONSTRAINT "FK_7c405625c644e8408ae5bd278fe" FOREIGN KEY ("discountId") REFERENCES "discount"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_discount_discount" DROP CONSTRAINT "FK_7c405625c644e8408ae5bd278fe"`);
        await queryRunner.query(`ALTER TABLE "order_discount_discount" DROP CONSTRAINT "FK_be4cc974af393b5cd0a2d0778f8"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "DF_8174eb35667132931ceb6fd8089"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "DF_8174eb35667132931ceb6fd8089" DEFAULT user_name() FOR "roles"`);
        await queryRunner.query(`DROP INDEX "IDX_7c405625c644e8408ae5bd278f" ON "order_discount_discount"`);
        await queryRunner.query(`DROP INDEX "IDX_be4cc974af393b5cd0a2d0778f" ON "order_discount_discount"`);
        await queryRunner.query(`DROP TABLE "order_discount_discount"`);
    }

}
