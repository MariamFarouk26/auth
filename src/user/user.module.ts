import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { jwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  controllers: [UserController],
  providers: [UserService,jwtStrategy],
})
export class UserModule {}
