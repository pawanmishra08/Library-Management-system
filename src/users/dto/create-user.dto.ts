import { IsNotEmpty, IsNumber, IsOptional,IsString, MaxLength } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @IsNumber()
    book_id: number;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsNumber()
    member_id: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(15)
    mobile: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
