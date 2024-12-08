import { MigrationInterface, QueryRunner } from "typeorm";

export class  $name1733661735013 implements MigrationInterface {
    name = ' $name1733661735013'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order_product" ("id" int NOT NULL IDENTITY(1,1), "quantity" int NOT NULL, "productId" uniqueidentifier NOT NULL, "variantId" nvarchar(255) NOT NULL, "orderIdd" int NOT NULL, "orderId" uniqueidentifier, CONSTRAINT "PK_539ede39e518562dfdadfddb492" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "DF_8174eb35667132931ceb6fd8089"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "DF_8174eb35667132931ceb6fd8089" DEFAULT user FOR "roles"`);
        await queryRunner.query(`ALTER TABLE "order_product" ADD CONSTRAINT "FK_3fb066240db56c9558a91139431" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_product" ADD CONSTRAINT "FK_073c85ed133e05241040bd70f02" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_product" DROP CONSTRAINT "FK_073c85ed133e05241040bd70f02"`);
        await queryRunner.query(`ALTER TABLE "order_product" DROP CONSTRAINT "FK_3fb066240db56c9558a91139431"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "DF_8174eb35667132931ceb6fd8089"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "DF_8174eb35667132931ceb6fd8089" DEFAULT user_name() FOR "roles"`);
        await queryRunner.query(`DROP TABLE "order_product"`);
    }

}
