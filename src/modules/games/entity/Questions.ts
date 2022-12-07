import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { LevelTypes, Status } from "../../../entity";

@Entity('questions')
export class Questions {
    @PrimaryGeneratedColumn()
    @Column({
        type: 'int',
        primary: true,
        unique: true,
        generated: true
    })
    id: number;

    @OneToOne(() => LevelTypes, (level) => level.id, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION', eager: true })
    @JoinColumn({
        referencedColumnName: 'id',
        name: 'type_id'
    })
    types: LevelTypes;

    @OneToOne(() => Status, (status) => status.id, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION', eager: true })
    @JoinColumn({
        referencedColumnName: 'id',
        name: 'status_id'
    })
    status: Status;

    @Column({
        type: 'timestamp',
        default: () => 'now()'
    })
    updatedAt: Date;
}