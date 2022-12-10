import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('languages')
export class Languages {
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
        length: '15',
        nullable: true
    })
    title: string;
}