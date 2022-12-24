import { MigrationInterface, QueryRunner } from "typeorm"

export class Withdrawal1670875110773 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // CREATE TABLE `tbl_withdrawal` (
        //     `deposit_id` int(11) NOT NULL,
        //     `transaction_code` varchar(30) NOT NULL,
        //     `member_id` int(11) NOT NULL,
        //     `amount` float NOT NULL,
        //     `charged` float NOT NULL,
        //     `to_receive` float NOT NULL,
        //     `date_time` datetime NOT NULL,
        //     `method` int(1) NOT NULL,
        //     `status` int(1) NOT NULL,
        //     `remarks` varchar(100) NOT NULL
        //     ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
