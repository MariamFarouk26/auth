
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { jwtSecret } from './utils/constants';

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest:ExtractJwt.fromExtractors([jwtStrategy.extractJWT]),
      // jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey:jwtSecret,
    });
  }

  private static extractJWT (req :Request): string|null{
    if(req.cookies && "Token" in req.cookies){
        return req.cookies.Token
    }
    return null;
  }


  // validate token 
  async validate(payload :{id:string ;email:string}) {
    return payload;
  }
}