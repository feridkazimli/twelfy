import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Games, Questions } from "./";

@Entity('question_of_games')
export class QuestionOfGames {
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
}