import {
    MigrationInterface, 
    QueryRunner, 
    Table, 
} from "typeorm"

export class Users1669314870893 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'users',
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
                        name: 'nickname',
                        type: 'varchar',
                        length: "150"
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        length: "255"
                    },
                    {
                        name: 'auth_token',
                        type: 'varchar',
                        length: "255"
                    },
                    {
                        name: 'phone',
                        type: 'varchar',
                        length: "20",
                        isUnique: true,
                    },
                    {
                        name: 'active',
                        type: 'tinyint',
                        width: 1
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP'
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP'
                    }
                ],
            }),
            true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
