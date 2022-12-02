import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users";

@Entity('user_meta')
export class UserMeta {
    @PrimaryGeneratedColumn()
    @Column({
        type: 'int',
        primary: true,
        unique: true,
        generated: true
    })
    id: number;

    @OneToOne(() => Users, (user) => user.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE', eager: true })
    @JoinColumn({
        referencedColumnName: 'id',
        name: 'user_id'
    })
    user: Users;

    @Column({
        type: 'varchar',
        length: '150'
    })
    firstName: string;

    @Column({
        type: 'varchar',
        length: '150'
    })
    lastName: string;

    @Column({
        type: 'varchar',
        length: '150'
    })
    father: string;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    birthday: Date;
}