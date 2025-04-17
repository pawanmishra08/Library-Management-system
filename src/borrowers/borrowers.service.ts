import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBorrowerDto } from './dto/create-borrower.dto';
import { UpdateBorrowerDto } from './dto/update-borrower.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { captalizeFirstLetterOfEachWordInPhrase } from 'src/helpers/captialize';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { CreatePublisherDto } from 'src/publishers/dto/create-publisher.dto';

@Injectable()
export class BorrowersService {
  constructor( private readonly prismaService: PrismaService){}

  async create(createBorrowerDto: CreateBorrowerDto) {
    createBorrowerDto.book_name = captalizeFirstLetterOfEachWordInPhrase(createBorrowerDto.book_name);

    const borrower = await this.prismaService.borrower.findFirst({
      where: {
        book_name: createBorrowerDto.book_name,
      },
    });

    if (borrower) {
      throw new BadRequestException (`Borrower with ${createBorrowerDto.book_name} has been alreadyyy taken`);
    }

    return this.prismaService.borrower.create({ data: createBorrowerDto});
  }

  findAll() {
    return this.prismaService.borrower.findMany();
  }

  findOne(id: number) {
    return this.getBorrowerById(id);
  }

   async update(id: number, updateBorrowerDto: UpdateBorrowerDto) {
    await this.getBorrowerById(id);

    const borrower = await this.prismaService.borrower.findFirst({
      where: {id},
    })
    if( borrower && borrower.id !== id){
      throw new BadRequestException(`borrower with ${id} has been alreadyyy taken`);
    }
    return this.prismaService.borrower.update({
      where: {id },
      data: updateBorrowerDto,
    })
  }

   async remove(id: number) {
   await this.getBorrowerById(id);
    return this.prismaService.borrower.delete({
      where: { id }
    });
  }
    private  async getBorrowerById(id:number) {
      const borrower = await this.prismaService.borrower.findFirst({ where: { id } });

      if(!borrower) {
        throw new NotFoundException(`Borrower with ${id} does not exist`);
      }
      return borrower;
    };
}
