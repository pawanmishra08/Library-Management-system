import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { captalizeFirstLetterOfEachWordInPhrase } from 'src/helpers/captialize';

@Injectable()
export class PublishersService {
  constructor( private readonly prismaService: PrismaService) {}

   async create(createPublisherDto: CreatePublisherDto) {
    createPublisherDto.name= captalizeFirstLetterOfEachWordInPhrase(createPublisherDto.name);

    const publisher = await this.prismaService.publisher.findFirst({
      where: {
         name: CreatePublisherDto.name,
      },
    })

    if(publisher){
      throw new BadRequestException(`Books with ${createPublisherDto.name} has been alreadyyy taken`);
    }
    return this.prismaService.publisher.create({ data: createPublisherDto });
  }

  findAll() {
    return this.prismaService.publisher.findMany();
  }

  findOne(id: number) {
    return this.getPublisherById(id);
  }

   async update(id: number, updatePublisherDto: UpdatePublisherDto) {
   return this.getPublisherById(id);

    const publisher = await this.prismaService.publisher.findFirst({
    where: {
     name: updatePublisherDto.name,
     address: updatePublisherDto.address,
    },
   });

   if ( publisher && publisher.id !== id){
    throw new BadRequestException(`publisher with ${id } has been alreadyyyyyyy taken`)
   }
   return this.prismaService.publisher.update({
    where: { id },
    data: updatePublisherDto,
   });
  }

   async remove(id: number) {
    await this.getPublisherById(id);
   return this.prismaService.publisher.delete({
    where: { id }
   });
  }

  private  async getPublisherById(id:number) {
    const publisher = await this.prismaService.publisher.findFirst({ where: { id } });

    if(!publisher) {
      throw new NotFoundException(`Books with ${id} does not exist`);
    }
    return publisher;
  };
}
