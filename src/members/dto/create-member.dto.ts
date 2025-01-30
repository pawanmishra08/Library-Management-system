import { IsNotEmpty, IsNumber, IsOptional, isString, IsString } from "class-validator";

export class CreateMemberDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    address: string;

    @IsOptional()
    @IsNumber()
    membership_expiry_date: number;

}
