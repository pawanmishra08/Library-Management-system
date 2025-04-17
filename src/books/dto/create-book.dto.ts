import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, isString, IsString } from "class-validator";

export class CreateBookDto {

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    author : string;

   @IsNumber()
   @IsOptional()
   price: number;

   @IsBoolean()
   @IsOptional()
   available: boolean;

   @IsNotEmpty()
   @IsNumber()
   publisher_id: number;

}
