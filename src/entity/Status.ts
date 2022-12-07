import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('status')
export class Status {
    @PrimaryGeneratedColumn()
    @Column({
        type: 'tinyint',
        primary: true,
        unique: true,
        generated: true
    })
    id: number;

    @Column({
        type: 'varchar',
        length: '30',
        nullable: true
    })
    title: string;
}