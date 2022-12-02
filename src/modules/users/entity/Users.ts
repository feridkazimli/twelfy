import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class Users {
    @PrimaryGeneratedColumn()
    @Column({
        type: 'int',
        primary: true,
        unique: true,
        generated: true
    })
    id: number;

    @Column({
        type: 'varchar',
        length: '150'
    })
    nickname: string;

    @Column({
        type: 'varchar',
        length: '255'
    })
    password: string;
    
    @Column({
        type: 'varchar',
        length: '255'
    })
    auth_token: string;

    @Column({
        type: 'varchar',
        length: '20',
        unique: true,
    })
    phone: string;

    @Column({
        type: 'tinyint',
        width: 1
    })
    active: number;

    @Column({
        type: 'timestamp',
        default: () => 'now()'
    })
    updatedAt: Date;
}