import { MigrationInterface, QueryRunner } from "typeorm"

export class TransactionSettings1670875156564 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // CREATE TABLE `tbl_transaction_setting` (
        //     `setting_id` int(11) NOT NULL,
        //     `usd_current_value` float NOT NULL,
        //     `withdrawal_charge` float NOT NULL,
        //     `daily_withdrawal_limit` float NOT NULL,
        //     `monthly_withdrawal_limit` float NOT NULL
        //     ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
