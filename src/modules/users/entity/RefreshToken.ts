import { BeforeInsert, Column, Entity, Generated, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users";
import { v4 } from 'uuid';

@Entity('token_list')
export class RefreshToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(type => Users, user => user.id, { cascade: true, eager: true })
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user: Users;

    @Column({
        type: 'text',
    })
    rfrsh_token: string;

    @BeforeInsert()
	addId() {
		this.id = v4();
	}
}