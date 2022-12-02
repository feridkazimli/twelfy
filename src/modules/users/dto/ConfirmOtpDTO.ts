import { IsNumber, IsNotEmpty } from 'class-validator'

export class ConfirmOtpDTO {    
    @IsNotEmpty()
    @IsNumber()
    private userId: number;
    
    @IsNotEmpty()
    @IsNumber()
    private otpCode: number;

    getUserId(): number {
        return this.userId;
    } 

    getOtpCode(): number {
        return this.otpCode;
    }
}