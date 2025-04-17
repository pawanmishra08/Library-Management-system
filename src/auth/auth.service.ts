import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/logindto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService{
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
    ) {}

    async login(loginDto: LoginDto){
        const user = await this.prismaService.user.findFirst({
            where:{
                OR: [
                    {
                        email: loginDto.username,
                    },
                    {
                        mobile: loginDto.username,
                    },
                ],
            },
            include: {
                books: true,
            },
        });
        if(!user){
            throw new NotFoundException('unable to find the user');
        }
        if(!(await compare(loginDto.password, user.password))) {
            throw new UnauthorizedException('Invalid credientials');
        }
        const token = await this.jwtService.signAsync({user});

        return { token,};
    }
}


