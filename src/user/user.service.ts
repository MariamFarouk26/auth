import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class UserService {
  
  constructor (private prisma:PrismaService){}

  findAll() {
    return this.prisma.user.findMany({select:{id:true, email:true}});
  }

  async findOne(id: string ,req :Request) {
    const founded = await this.prisma.user.findUnique({where: {id} });

   
    if(!founded) throw new NotFoundException();

    //i want to only can search for user with id the match the id of user in cookie (i get id os user loging from cookie from requser)
    const decodedUser= req.user as {id:string ; email :string}

    if(founded.id != decodedUser.id ) throw new ForbiddenException()
    delete founded.hashPass;

    return {founded}

  }

 
}
