import { IsBoolean, IsNumber } from "class-validator";

export class GivenAnswerDTO {
    @IsNumber()
    private userId: number;
    public get UserId(): number {
        return this.userId;
    }

    @IsNumber()
    private answerId: number;
    public get AnswerId(): number {
        return this.answerId;
    }

    @IsNumber()
    private questionId: number;
    public get QuestionId(): number {
        return this.questionId;
    }

    @IsNumber()
    private gameId: number;
    public get GameId(): number {
        return this.gameId;
    }

    @IsBoolean()
    private isGiven: boolean;
    public get IsGiven(): boolean {
        return this.isGiven;
    }
}