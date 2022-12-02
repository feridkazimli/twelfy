import { IsNotEmpty } from 'class-validator'

export class LoginDTO {
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
}