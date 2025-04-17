import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { captalizeFirstLetterOfEachWordInPhrase } from 'src/helpers/captialize';
import { MembersService } from 'src/members/members.service';
import { hash } from 'bcrypt';
import { BooksService } from 'src/books/books.service';

@Injectable()
export class UsersService {
   constructor( private readonly prismaService : PrismaService) {}

    async create(createUserDto: CreateUserDto) {

      const memberservice = new MembersService(this.prismaService)
      await memberservice.findOne(createUserDto.member_id);

      const bookobj = await this.prismaService.book.findFirst({
        where:{
          title: createUserDto.book,
        },
      });
      if(!bookobj) {
        throw new NotFoundException(` unable to find the Book with title ${createUserDto.book}`)
      }
      createUserDto.book_id = bookobj.id;
      const { book , ...rest } = createUserDto;

      rest.name = captalizeFirstLetterOfEachWordInPhrase(rest.name);

      if(await this.checkIfEmailExists(rest.email)) {
        throw new BadRequestException("This email has been alreadyyy taken")
      }
      if(await this.checkIfMobileExists(rest.mobile)) {
        throw new BadRequestException("This mobile has been alreadyyy taken")
      }
      rest.password = await hash(rest.password, 10);

        return this.prismaService.user.create({
          data: rest ,
        });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(id: number) {
    return this.getuserById(id);
  }

   async update(id: number, updateUserDto: UpdateUserDto) {
    await this.getuserById(id);

    const bookservice = new BooksService(this.prismaService);
    await bookservice.findOne(updateUserDto.book_id);

    const memberservice = new MembersService(this.prismaService);
    await memberservice.findOne(updateUserDto.member_id);

    if(updateUserDto.name) {
      updateUserDto.name = captalizeFirstLetterOfEachWordInPhrase(updateUserDto.name);
    }

    const { book, ...rest} = updateUserDto;

    if(!await this.checkIfEmailExists(updateUserDto.email, id)){
      throw new BadRequestException("This email has been alraedyyy taken")
    }
    if(!await this.checkIfMobileExists(updateUserDto.mobile, id)) {
      throw new BadRequestException("This mobile has been already taken")
    }
    if(updateUserDto.password){
      updateUserDto.password = await hash(updateUserDto.password, 10)
    }
    return this.prismaService.user.update({
      where: { id },
      data: rest,
    });
  }

  remove(id: number) {
    return this.getuserById(id);
    return this.prismaService.user.delete({
      where: { id },
    })
  }

  private async checkIfEmailExists(email: string, id?: number): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: { email }
    });
    if(id){
      return user ? user.id === id : true;
    }
    return !!user;
  }

  private async checkIfMobileExists(mobile: string, id?: number): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where:{ mobile ,}
    });
    if(id) {
      return user ? user.id === id: true;
    }
    return !!user;
  }

  private async getuserById(id: number) {
    const user = await this.prismaService.user.findFirst({
      where: { id }
    });
    if(!user) {
      throw new NotFoundException(`Unable to find user with id ${id}`)
    }
    return user;
  }
}
