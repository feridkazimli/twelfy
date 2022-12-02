import { MaxLength, IsNotEmpty } from 'class-validator'

export class PhoneAuthDTO {    
    @IsNotEmpty()
    @MaxLength(10, {
        message: 'Telefon nömrəsini maksimum 12 rəqəmdən ibarət olmalıdır'
    })
    private phone: string;

    get Phone() {
        return this.phone;
    }
}