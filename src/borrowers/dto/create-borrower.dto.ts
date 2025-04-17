import { IsNotEmpty, isNumber, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBorrowerDto {

    @IsNotEmpty()
    @IsString()
    book_name : string;

    @IsOptional()
    @IsNumber()
    issue_date : number;

    @IsOptional()
    @IsNumber()
    due_date: number;

    @IsOptional()
    @IsNumber()
    return_date: number;

    @IsNotEmpty()
    @IsNumber()
    book_id: number;

    @IsNotEmpty()
    @IsNumber()
    member_id: number;
}
