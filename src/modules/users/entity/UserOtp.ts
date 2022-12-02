import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { Users } from "./Users";

@Entity('user_otp')
export class UserOtp {
    @PrimaryGeneratedColumn()
    @Column({
        type: 'int',
        primary: true,
        unique: true,
        generated: true
    })
    id: number;

    @OneToOne(() => Users, { onDelete: 'CASCADE' })
    @JoinColumn({
        referencedColumnName: 'id',
        name: 'user_id'
    })
    user: Users;

    @Column({
        type: 'mediumint',
        width: 6
    })
    otp_code: number;

    @Column({
        type: 'timestamp',
        nullable: false,
        default: () => 'now()'
    })
    otp_expiry: Date;

    @Column({
        type: 'tinyint',
        width: 1,
    })
    otp_status:number;

    @Column({
        type: 'tinyint',
        width: 1
    })
    otp_retry_count:number;
}