import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class AuthDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    public email :string;

    @IsNotEmpty()
    @IsString()
    @Length(3,20,{ message: "pass must be between 3 to 20 char" } )
    public password :string;
}
