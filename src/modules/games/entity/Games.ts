import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { LevelTypes, Status } from "../../../entity";

@Entity('games')
export class Games {
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
        type: 'boolean',
        default: false,
        width: 1
    })
    is_free: boolean;

    @Column({
        type: 'time',
    })
    period: Date;

    @Column({
        type: 'float'
    })
    amount: number;

    @Column({
        type: 'tinyint'
    })
    answer_count: number;

    @Column({
        type: 'timestamp',
        default: () => 'now()'
    })
    updatedAt: Date;
}