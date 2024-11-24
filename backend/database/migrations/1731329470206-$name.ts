import { MigrationInterface, QueryRunner } from 'typeorm';

export class $name1731329470206 implements MigrationInterface {
    name = ' $name1731329470206';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`invoice\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`total\` int NOT NULL, \`orderId\` varchar(36) NULL, UNIQUE INDEX \`REL_f494ce6746b91e9ec9562af485\` (\`orderId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`discount\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`discountCode\` varchar(255) NULL, \`discountPercentage\` int NULL, \`description\` varchar(255) NULL, \`amountDiscount\` int NULL, \`startDate\` datetime NULL, \`endDate\` datetime NULL, \`points_required\` int NULL, \`isActive\` tinyint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `ALTER TABLE \`invoice\` ADD CONSTRAINT \`FK_f494ce6746b91e9ec9562af4857\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`invoice\` DROP FOREIGN KEY \`FK_f494ce6746b91e9ec9562af4857\``,
        );
        await queryRunner.query(`DROP TABLE \`discount\``);
        await queryRunner.query(
            `DROP INDEX \`REL_f494ce6746b91e9ec9562af485\` ON \`invoice\``,
        );
        await queryRunner.query(`DROP TABLE \`invoice\``);
    }
}
