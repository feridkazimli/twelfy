import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "../../users/entity";
import { Answers } from "./Answers";
import { Games } from "./Games";
import { Questions } from "./Questions";

@Entity('user_game_answers')
export class GivenAnswer {
    @PrimaryGeneratedColumn()
    @Column({
        type: 'int',
        primary: true,
        unique: true,
        generated: true
    })
    id: number;

    @ManyToOne(() => Games, game => game.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE', eager: true })
    @JoinColumn({ name: 'game_id', referencedColumnName: 'id' })
    games: Games;

    @ManyToOne(() => Questions, question => question.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE', eager: true })
    @JoinColumn({ name: 'question_id', referencedColumnName: 'id' })
    questions: Questions;

    @ManyToOne(() => Users, user => user.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE', eager: true })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    users: Users;

    @OneToOne(() => Answers, answer => answer.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE', eager: true })
    @JoinColumn({ name: 'answer_id', referencedColumnName: 'id' })
    answers: Answers;

    @Column({
        type: 'boolean',
        default: false
    })
    is_given: boolean;
}