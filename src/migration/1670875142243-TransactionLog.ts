import { MigrationInterface, QueryRunner } from "typeorm"

export class TransactionLog1670875142243 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // CREATE TABLE `tbl_transaction_log` (
        //     `log_id` int(11) NOT NULL,
        //     `member_id` int(11) NOT NULL,
        //     `type` int(1) NOT NULL,
        //     `amount` float NOT NULL,
        //     `status` int(1) NOT NULL
        //     ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
