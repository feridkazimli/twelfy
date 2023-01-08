import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdatePasswordDTO {
    @IsNotEmpty()
    private userId: number;
    public get UserId(): number {
        return this.userId;
    }

    @IsNotEmpty()
    private password: string;
    public get Password(): string {
        return this.password;
    }
}