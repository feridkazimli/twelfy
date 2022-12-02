import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class TokenList1669838028126 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'token_list',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        isUnique: true,
                        generationStrategy: 'uuid'
                    },
                    {  
                        name: 'user_id',
                        type: 'int'
                    },
                    {
                        name: 'rfrsh_token',
                        type: 'text'
                    }
                ]
            }),
            true
        )

        queryRunner.clearSqlMemory();

        const foreignKey = new TableForeignKey({
                        columnNames: ["user_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "users",
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    });

        await queryRunner.createForeignKey("token_list", foreignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
