import { MigrationInterface, QueryRunner } from "typeorm"

export class CurrencySupported1670875225570 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // CREATE TABLE `tbl_currency_supported` (
        //     `currency_id` int(11) NOT NULL,
        //     `currency_name` varchar(20) NOT NULL,
        //     `currency_symbol` varchar(5) NOT NULL,
        //     `usd_equivalent` float NOT NULL,
        //     `status` int(1) NOT NULL
        //     ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
