import { MigrationInterface, QueryRunner } from 'typeorm';

export class $name1733278815897 implements MigrationInterface {
    name = ' $name1733278815897';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "image_product" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_e6a9e829e17fc47fc17d695af8e" DEFAULT NEWSEQUENTIALID(), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_79a664dfae7e019450074fadf7d" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_5dba2da21c7a47755adb1579ec0" DEFAULT getdate(), "imageUrl" nvarchar(255) NOT NULL, "productId" uniqueidentifier, CONSTRAINT "PK_e6a9e829e17fc47fc17d695af8e" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "discount" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_d05d8712e429673e459e7f1cddb" DEFAULT NEWSEQUENTIALID(), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_8ea3dc26dc8c9d871f83025c599" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_458c3adaa29baac75ec954e079a" DEFAULT getdate(), "discountCode" nvarchar(255), "discountPercentage" int, "description" nvarchar(255), "amountDiscount" int, "startDate" datetime, "endDate" datetime, "points_required" int, "isActive" bit, CONSTRAINT "PK_d05d8712e429673e459e7f1cddb" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "order" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_1031171c13130102495201e3e20" DEFAULT NEWSEQUENTIALID(), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_7bb07d3c6e225d75d8418380f11" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_23db16cabddb9d10a73b5287bf8" DEFAULT getdate(), "orderDate" datetime NOT NULL, "requiredDate" datetime NOT NULL, "shippedDate" datetime NOT NULL, "status" nvarchar(255) NOT NULL, "comments" nvarchar(255) NOT NULL, "customerId" uniqueidentifier, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "cart_product" ("id" int NOT NULL IDENTITY(1,1), "quantity" int NOT NULL, "productId" uniqueidentifier NOT NULL, "cartId" uniqueidentifier NOT NULL, CONSTRAINT "PK_dccd1ec2d6f5644a69adf163bc1" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "cart" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_c524ec48751b9b5bcfbf6e59be7" DEFAULT NEWSEQUENTIALID(), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_8af054e0d37fd0cf08bd97ec779" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_2730c0c8bc7092e4c4154edc539" DEFAULT getdate(), CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "user" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_cace4a159ff9f2512dd42373760" DEFAULT NEWSEQUENTIALID(), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_e11e649824a45d8ed01d597fd93" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_80ca6e6ef65fb9ef34ea8c90f42" DEFAULT getdate(), "Fname" nvarchar(255) NOT NULL, "LName" nvarchar(255) NOT NULL, "email" nvarchar(255) NOT NULL, "username" nvarchar(255) NOT NULL, "hash_password" nvarchar(255) NOT NULL, "salt" nvarchar(255) NOT NULL, "phone_number" int NOT NULL, "address" nvarchar(255) NOT NULL, "roles" nvarchar(255) CONSTRAINT CHK_44cb3730aeca360d1f207aad18_ENUM CHECK(roles IN ('admin','user')) NOT NULL CONSTRAINT "DF_8174eb35667132931ceb6fd8089" DEFAULT user, "cartId" uniqueidentifier, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE UNIQUE INDEX "REL_342497b574edb2309ec8c6b62a" ON "user" ("cartId") WHERE "cartId" IS NOT NULL`,
        );
        await queryRunner.query(
            `CREATE TABLE "review" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_2e4299a343a81574217255c00ca" DEFAULT NEWSEQUENTIALID(), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_34968765df5f6f3946c2e4573a7" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_b5048343dfc8ccdafd5ef470e4b" DEFAULT getdate(), "rating" int NOT NULL, "comment" nvarchar(255), "userId" uniqueidentifier, "productId" uniqueidentifier, "productVariantId" uniqueidentifier, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "product_variant" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_1ab69c9935c61f7c70791ae0a9f" DEFAULT NEWSEQUENTIALID(), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_63a637d003d27e09fcb224faac3" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_2d191cb7aa630ea15170427984a" DEFAULT getdate(), "ram" int NOT NULL, "rom" int NOT NULL, "cpu" varchar(50) NOT NULL, "color" nvarchar(255) NOT NULL, "quantity" int NOT NULL, "price" decimal(10,2) NOT NULL CONSTRAINT "DF_2547c6a0133c17089fd2e44d77d" DEFAULT 0, "productId" uniqueidentifier, CONSTRAINT "PK_1ab69c9935c61f7c70791ae0a9f" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "category" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_9c4e4a89e3674fc9f382d733f03" DEFAULT NEWSEQUENTIALID(), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_c15e0393f5bebfb602fb0778972" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_a7f046d46350d4bc4aa0f7c113a" DEFAULT getdate(), "title" nvarchar(255) NOT NULL, "description" nvarchar(255) NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "product" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_bebc9158e480b949565b4dc7a82" DEFAULT NEWSEQUENTIALID(), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_6b71c587b0fd3855fa23b759ca8" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_41bde09db7136dcee687c2b1f05" DEFAULT getdate(), "name" nvarchar(255) NOT NULL, "baseprice" decimal(10,2) NOT NULL CONSTRAINT "DF_ee34b877b5b38ba070987c5e0c9" DEFAULT 0, "description" nvarchar(255), "manufacturer" nvarchar(255) NOT NULL, "screenSize" float, "screenType" varchar(255), "refreshRate" float, "battery" float, "camera" varchar(255), "averageRating" decimal(3,1) NOT NULL CONSTRAINT "DF_a3f94646677631f7385f434f56b" DEFAULT 0, "categoryId" uniqueidentifier, "supplierId" uniqueidentifier, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "supplier" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_2bc0d2cab6276144d2ff98a2828" DEFAULT NEWSEQUENTIALID(), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_4029c421419c821e37fba395bd7" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_59f1a64ffcf5e3249d8e625a909" DEFAULT getdate(), "name" nvarchar(255) NOT NULL, "address" nvarchar(255) NOT NULL, "email" nvarchar(255) NOT NULL, "phone" nvarchar(255) NOT NULL, CONSTRAINT "PK_2bc0d2cab6276144d2ff98a2828" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "product_discounts_discount" ("productId" uniqueidentifier NOT NULL, "discountId" uniqueidentifier NOT NULL, CONSTRAINT "PK_077f481076e25b11437259b62d2" PRIMARY KEY ("productId", "discountId"))`,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_4724c7a7c65a0a2c45a1c00cc0" ON "product_discounts_discount" ("productId") `,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_be7c9f4c0d0d68333b1d75045d" ON "product_discounts_discount" ("discountId") `,
        );
        await queryRunner.query(
            `ALTER TABLE "image_product" ADD CONSTRAINT "FK_46730a20b58d86123a5bedada8d" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "order" ADD CONSTRAINT "FK_124456e637cca7a415897dce659" FOREIGN KEY ("customerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "cart_product" ADD CONSTRAINT "FK_4f1b0c66f4e0b4610e14ca42e5c" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "cart_product" ADD CONSTRAINT "FK_139f8024067696fe5a8400ebda2" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "user" ADD CONSTRAINT "FK_342497b574edb2309ec8c6b62aa" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "review" ADD CONSTRAINT "FK_1337f93918c70837d3cea105d39" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "review" ADD CONSTRAINT "FK_2a11d3c0ea1b2b5b1790f762b9a" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "review" ADD CONSTRAINT "FK_72d02541ae9b6fc2fc2c57e745a" FOREIGN KEY ("productVariantId") REFERENCES "product_variant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "product_variant" ADD CONSTRAINT "FK_6e420052844edf3a5506d863ce6" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "product" ADD CONSTRAINT "FK_4346e4adb741e80f3711ee09ba4" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "product_discounts_discount" ADD CONSTRAINT "FK_4724c7a7c65a0a2c45a1c00cc01" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE "product_discounts_discount" ADD CONSTRAINT "FK_be7c9f4c0d0d68333b1d75045d3" FOREIGN KEY ("discountId") REFERENCES "discount"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "product_discounts_discount" DROP CONSTRAINT "FK_be7c9f4c0d0d68333b1d75045d3"`,
        );
        await queryRunner.query(
            `ALTER TABLE "product_discounts_discount" DROP CONSTRAINT "FK_4724c7a7c65a0a2c45a1c00cc01"`,
        );
        await queryRunner.query(
            `ALTER TABLE "product" DROP CONSTRAINT "FK_4346e4adb741e80f3711ee09ba4"`,
        );
        await queryRunner.query(
            `ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`,
        );
        await queryRunner.query(
            `ALTER TABLE "product_variant" DROP CONSTRAINT "FK_6e420052844edf3a5506d863ce6"`,
        );
        await queryRunner.query(
            `ALTER TABLE "review" DROP CONSTRAINT "FK_72d02541ae9b6fc2fc2c57e745a"`,
        );
        await queryRunner.query(
            `ALTER TABLE "review" DROP CONSTRAINT "FK_2a11d3c0ea1b2b5b1790f762b9a"`,
        );
        await queryRunner.query(
            `ALTER TABLE "review" DROP CONSTRAINT "FK_1337f93918c70837d3cea105d39"`,
        );
        await queryRunner.query(
            `ALTER TABLE "user" DROP CONSTRAINT "FK_342497b574edb2309ec8c6b62aa"`,
        );
        await queryRunner.query(
            `ALTER TABLE "cart_product" DROP CONSTRAINT "FK_139f8024067696fe5a8400ebda2"`,
        );
        await queryRunner.query(
            `ALTER TABLE "cart_product" DROP CONSTRAINT "FK_4f1b0c66f4e0b4610e14ca42e5c"`,
        );
        await queryRunner.query(
            `ALTER TABLE "order" DROP CONSTRAINT "FK_124456e637cca7a415897dce659"`,
        );
        await queryRunner.query(
            `ALTER TABLE "image_product" DROP CONSTRAINT "FK_46730a20b58d86123a5bedada8d"`,
        );
        await queryRunner.query(
            `DROP INDEX "IDX_be7c9f4c0d0d68333b1d75045d" ON "product_discounts_discount"`,
        );
        await queryRunner.query(
            `DROP INDEX "IDX_4724c7a7c65a0a2c45a1c00cc0" ON "product_discounts_discount"`,
        );
        await queryRunner.query(`DROP TABLE "product_discounts_discount"`);
        await queryRunner.query(`DROP TABLE "supplier"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "product_variant"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(
            `DROP INDEX "REL_342497b574edb2309ec8c6b62a" ON "user"`,
        );
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "cart_product"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "discount"`);
        await queryRunner.query(`DROP TABLE "image_product"`);
    }
}
