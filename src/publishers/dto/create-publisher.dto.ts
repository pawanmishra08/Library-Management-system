import { IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreatePublisherDto {

    @IsNotEmpty()
    @IsString()
    name : string;

    @IsString()
    @IsOptional()
    address : string;
}
