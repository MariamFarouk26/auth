import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt"
import { jwtSecret } from './utils/constants';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private prisma:PrismaService , private jwt:JwtService){}

  create(createAuthDto: AuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

 

  async SignUp(dto:AuthDto){
    const{email , password} = dto;

    const foundUser = await this.IsfoundUser(email);
    if(foundUser) {
      // console.log(foundUser)
      throw new BadRequestException('Email is taken')
    }

    const hashedpassword = await this.hashPassword(password);
    await this.prisma.user.create({
      data:{
        email,
        hashPass:hashedpassword
      }});
    
    return {message: "signup successfully"}
  }


  async SignIn(dto:AuthDto , req:Request , res:Response){
    const{email , password} = dto;

    //to check the email
    const foundUser = await this.IsfoundUser(email);

    if(!foundUser) {
      console.log(foundUser)
      throw new BadRequestException('Wrong Email or Password')
    }

     //to check the pass
    const IsMatch = await this.comparePassword(password,foundUser.hashPass);
    if(!IsMatch) {
      console.log(IsMatch)
      throw new BadRequestException('Wrong Email or Password')
    }

    //sign jwt and return user
    const token = await this.signToken({id: foundUser.id,email:foundUser.email})
    if(!token) {
      //stop func if no token else send jwt as cookie to client 
      throw new ForbiddenException()
    } 
  
    //res.cookie(name of cookie, value that it carry)
    res.cookie("Token",token)

    // return {token}


    // Set JWT token in the response header
    // res.header("Authorization",  token);

    return res.send({ message : "logged in successfully" })
  }


  //clean token from client
  async SignOut( res:Response){
    //remove cookie by it's name which used in sign in
    res.clearCookie("Token")
    return res.send({ message : "logged out successfully" })
  }

  async hashPassword(password:string){
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    return hashedPassword
  }

  async IsfoundUser(email:string){
    const found = await this.prisma.user.findUnique({where:{email}})
    return found
  }

  async comparePassword(password:string ,hash:string)
  {
    return await bcrypt.compare(password, hash);
  }

  async signToken (args:{ id : string ; email : string}){
    let payload = args
    return this.jwt.signAsync(payload,{secret:jwtSecret})
  }
}
