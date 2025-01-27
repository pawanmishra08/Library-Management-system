import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';



@Injectable()
export class BooksService {
  constructor(private readonly prismaService: PrismaService){}

   async create(createBookDto: CreateBookDto) {
    // const book  = await this.prismaService.books.create({data: createBookDto});
    // return book;
    const book = await this.prismaService.books.findFirst({
      where: {
        title : createBookDto.title,
      },
    });

    if (book) {
     throw new BadRequestException (`Books ${createBookDto.title} has been alreadyyyyy taken`);
    }

   return this.prismaService.books.create({ data: createBookDto},);
    //return 'This action adds a new book';
  }

  findAll() {
    return this.prismaService.books.findMany();
  }

  findOne(id: number) {
    return this.getBooksById(id);
  }

   async update(id: number, updateBookDto: UpdateBookDto) {
   await this.getBooksById(id);

   const book = await this.prismaService.books.findFirst({
    where: {
      title: updateBookDto.title,
    },
   });

   if(book && book.id !== id) {
    throw new BadRequestException(`book with ${updateBookDto.title} has been alreadyyyy taken`);
   }
    return this.prismaService.books.update({
      where: { id} ,
      data: updateBookDto,
    });
  }

   async remove(id: number) {
    await this.getBooksById(id);
    return this.prismaService.books.delete({
      where: { id}
    });
  }

  private async getBooksById(id: number) {
    const book = await this.prismaService.books.findFirst({ where: { id } });

    if (!book) {
      throw new NotFoundException(`Books with id ${id} does not exist`);
    }

    return book;
  }
}
