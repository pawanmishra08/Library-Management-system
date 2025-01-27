import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, isString, IsString } from "class-validator";

export class CreateBookDto {

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    author : string;

   @IsString()
   @IsOptional()
   price: number;

   @IsString()
   @IsBoolean()
   @IsOptional()
   available: Boolean;

}
