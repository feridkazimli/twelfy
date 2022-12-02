import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class UserMeta1669406161155 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'user_meta',
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
                        isUnique: true,
                        type: 'int'
                    },
                    {
                        name: 'firstName',
                        type: 'varchar',
                        length: '150'
                    },
                    {
                        name: 'lastName',
                        type: 'varchar',
                        length: '150'
                    },
                    {
                        name: 'father',
                        type: 'varchar',
                        length: '150'
                    },
                    {
                        name: 'birthday',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP'
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
            onUpdate: "CASCADE",
        });
        await queryRunner.createForeignKey("user_meta", foreignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}