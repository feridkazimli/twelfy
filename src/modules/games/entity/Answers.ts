import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "../../../entity";
import { QuestionLang } from "./QuestionLang";

@Entity('answers')
export class Answers {
    @PrimaryGeneratedColumn()
    @Column({
        type: 'int',
        primary: true,
        unique: true,
        generated: true
    })
    id: number;

    @ManyToOne(() => QuestionLang, question => question.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE', eager: true })
    @JoinColumn({ name: 'question_lang_id', referencedColumnName: 'id' })
    questions: QuestionLang;

    @OneToOne(() => Status, (status) => status.id, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION', eager: true })
    @JoinColumn({
        referencedColumnName: 'id',
        name: 'status_id'
    })
    status: Status;

    @Column({
        type: 'boolean',
        default: 0
    })
    is_correct: boolean;

    @Column({
        type: 'varchar',
        length: '255',
    })
    answer_text: string;
}