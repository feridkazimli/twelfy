import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../../../entity";
import { Languages } from "../../../entity/Languages";

@Entity('question_lang')
export class QuestionLang {
    @PrimaryGeneratedColumn()
    @Column({
        type: 'int',
        primary: true,
        unique: true,
        generated: true
    })
    id: number;

    @OneToOne(() => Status, (status) => status.id, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION', eager: true })
    @JoinColumn({
        referencedColumnName: 'id',
        name: 'status_id'
    })
    status: Status;

    @OneToOne(() => Languages, (status) => status.id, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION', eager: true })
    @JoinColumn({
        referencedColumnName: 'id',
        name: 'lang_id'
    })
    lang: Languages;

    @Column({
        type: 'text'
    })
    question_text: string;
}