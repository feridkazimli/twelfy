import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class UserGameAnswers1670524559847 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'user_game_answers',
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
                        name: 'user_id',
                        type: 'int'
                    },
                    {
                        name: 'question_id',
                        type: 'int'
                    },
                    {
                        name: 'answer_id',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'is_given',
                        type: 'boolean',
                        default: false
                    },
                    {
                        name: 'response_date',
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
        await queryRunner.createForeignKey("user_game_answers", foreignKey);

        const foreignKey2 = new TableForeignKey({
            columnNames: ["question_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "questions",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
        await queryRunner.createForeignKey("user_game_answers", foreignKey2);

        const foreignKey3 = new TableForeignKey({
            columnNames: ["answer_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "answers",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
        await queryRunner.createForeignKey("user_game_answers", foreignKey3);

        const foreignKey4 = new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
        await queryRunner.createForeignKey("user_game_answers", foreignKey4);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
