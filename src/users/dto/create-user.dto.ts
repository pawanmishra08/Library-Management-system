import { IsNotEmpty, IsNumber, IsOptional, isString, IsString, MaxLength } from "class-validator";

export class CreateUserDto {

    @IsOptional()
    @IsNumber()
    book_id: number;

    @IsNotEmpty()
    @IsString()
    book: string;

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
