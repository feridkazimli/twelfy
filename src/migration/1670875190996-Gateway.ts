import { MigrationInterface, QueryRunner } from "typeorm"

export class Gateway1670875190996 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // CREATE TABLE `tbl_gateway` (
        //     `gateway_id` int(11) NOT NULL,
        //     `gateway_name` varchar(30) NOT NULL,
        //     `type` int(1) NOT NULL,
        //     `status` int(1) NOT NULL
        //     ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
