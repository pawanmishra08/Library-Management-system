import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { captalizeFirstLetterOfEachWordInPhrase } from 'src/helpers/captialize';

@Injectable()
export class MembersService {
  constructor (private readonly prismaService: PrismaService) {}

   async create(createMemberDto: CreateMemberDto) {
    createMemberDto.name = captalizeFirstLetterOfEachWordInPhrase(createMemberDto.name);

    const member = await this.prismaService.member.findFirst({
      where:{
        name: createMemberDto.name,
      },
    });

    if( member) {
      throw new BadRequestException(`member with ${createMemberDto.name} has been taken`)
    }
    return this.prismaService.member.create({ data: createMemberDto});
  }

  findAll() {
    return this.prismaService.member.findMany();
  }

  findOne(id: number) {
    return this.getMembersById(id);
  }

   async update(id: number, updateMemberDto: UpdateMemberDto) {
    await this.getMembersById(id);

    const member = await this.prismaService.member.findFirst({
      where: {
        name: updateMemberDto.name,
        address: updateMemberDto.address,
        membership_expiry_date: updateMemberDto.membership_expiry_date,
      },
    });
    return this.prismaService.member.update({
      where: { id },
      data: updateMemberDto,
    });
  }

   async remove(id: number) {
    await this.getMembersById(id);
    return this.prismaService.member.delete({
      where: { id },
    });
  }
    private async getMembersById(id: number){
      const member = await this.prismaService.member.findFirst({ where: { id }});

      if(!member) {
        throw new BadRequestException(`Member with id ${id} does not exist heeree!!`);
      }
      return member;
    }
}
