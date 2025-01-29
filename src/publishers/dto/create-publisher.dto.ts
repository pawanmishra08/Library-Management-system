import { IsNotEmpty, IsOptional, IsString, isString } from "class-validator";

export class CreatePublisherDto {

    @IsNotEmpty()
    @IsString()
    name : string;

    @IsString()
    @IsOptional()
    address : string;
}
