import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class QuestionOfGames1670523226260 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'question_of_games',
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
                        name: 'game_id',
                        type: 'int'
                    },
                    {
                        name: 'question_id',
                        type: 'int'
                    },
                    {
                        name: 'add_date',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP'
                    }
                ]
            }),
            true
        );

        queryRunner.clearSqlMemory();
        const foreignKey = new TableForeignKey({
            columnNames: ["game_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "games",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
        await queryRunner.createForeignKey("question_of_games", foreignKey);

        const foreignKey2 = new TableForeignKey({
            columnNames: ["question_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "questions",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
        await queryRunner.createForeignKey("question_of_games", foreignKey2);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
