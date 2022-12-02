import { IsNotEmpty } from "class-validator";

export class UserMetaDTO {
    @IsNotEmpty()
    private userId: number;
    public get UserId(): number {
        return this.userId;
    }

    @IsNotEmpty()
    private nickname: string;
    public get Nickname(): string {
        return this.nickname;
    }

    @IsNotEmpty()
    private password: string;
    public get Password(): string {
        return this.password;
    }

    @IsNotEmpty()
    private firstName: string;
    public get FirstName(): string {
        return this.firstName;
    }

    @IsNotEmpty()
    private lastName: string;
    public get LastName(): string {
        return this.lastName;
    }

    @IsNotEmpty()
    private father: string;
    public get Father(): string {
        return this.father;
    }

    @IsNotEmpty()
    private birthday: string;

    public get Birthday(): string {
        return this.birthday;
    }
}