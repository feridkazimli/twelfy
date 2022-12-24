import { MigrationInterface, QueryRunner } from "typeorm"

export class Deposit1670875120533 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // CREATE TABLE `tbl_deposit` (
        //     `withdrawal_id` int(11) NOT NULL,
        //     `transaction_code` varchar(30) NOT NULL,
        //     `member_id` int(11) NOT NULL,
        //     `deposit_amount` float NOT NULL,
        //     `currency_id` int(11) NOT NULL,
        //     `date_time` datetime NOT NULL,
        //     `payment_gateway_id` int(11) NOT NULL,
        //     `status` int(1) NOT NULL,
        //     `remarks` varchar(100) NOT NULL
        //     ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
