import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { captalizeFirstLetterOfEachWordInPhrase } from 'src/helpers/captialize';

@Injectable()
export class BooksService {
  constructor(private readonly prismaService: PrismaService){}

   async create(createBookDto: CreateBookDto) {
    createBookDto.title = captalizeFirstLetterOfEachWordInPhrase(createBookDto.title);

    const book = await this.prismaService.book.findFirst({
      where: {
        title : createBookDto.title,
        author: createBookDto.author,
        publisher_id: createBookDto.publisher_id,
      },
    });

    if( await this.checkIfBooksExist(createBookDto.title)){
      throw new BadRequestException(`Books with ${createBookDto.title} has been already taken`);
    }

    if (book) {
     throw new BadRequestException (`Books ${createBookDto.title} has been alreadyyyyy taken`);
    }

   return this.prismaService.book.create({ data:  createBookDto });

  }

  findAll() {
    return this.prismaService.book.findMany();
  }

  findOne(id: number) {
    return this.getBooksById(id);
  }

   async update(id: number, updateBookDto: UpdateBookDto) {
   await this.getBooksById(id);

   const book = await this.prismaService.book.findFirst({
    where: {
    title: updateBookDto.title,
    author: updateBookDto.author,
    price: updateBookDto.price,
    available: updateBookDto.available,
    publisher_id : updateBookDto.publisher_id
    },
   });

    return this.prismaService.book.update({
      where: { id} ,
      data: updateBookDto,
    });
  }

   async remove(id: number) {
    await this.getBooksById(id);
    return this.prismaService.book.delete({
      where: { id}
    });
  }

  private async checkIfBooksExist(title: string, id?: number): Promise<boolean> {
    const book = await this.prismaService.book.findFirst(
      { where: { title }
    })

    if (id) {
      return book ? book.id === id: true;
    }

    return !!book;
  }

  private async getBooksById(id: number) {
    const book = await this.prismaService.book.findFirst({ where: { id } });

    if (!book) {
      throw new NotFoundException(`Books with id ${id} does not exist`);
    }

    return book;
  }
}
