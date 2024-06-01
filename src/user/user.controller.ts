import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { jwtAuthGuard } from 'src/auth/jwt.gaurd';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(jwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string ,@Req() req) {
    return this.userService.findOne(id ,req);
  }

 
}
