import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class UserOtp1669490752639 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'user_otp',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isUnique: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'user_id',
                        type: 'int',
                        isUnique: true,
                        isNullable: false
                    },
                    {
                        name: 'otp_code',
                        type: 'mediumint',
                        width: 6,
                    },
                    {
                        name: 'otp_expiry',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'otp_status',
                        type: 'tinyint',
                        width: 1,
                    },
                    {
                        name: 'otp_retry_count',
                        type: 'tinyint',
                        width: 1,
                    }
                ]
            }),
            true
        );

        queryRunner.clearSqlMemory();

        const foreignKey = new TableForeignKey({
                        columnNames: ["user_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "users",
                        onDelete: "CASCADE"
                    });

        await queryRunner.createForeignKey("user_otp", foreignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
