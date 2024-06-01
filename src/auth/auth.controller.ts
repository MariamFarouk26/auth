import { Controller, Get, Post, Body, Param, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/create-auth.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto: AuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
    
  }

  //this route must me before  the /:id one to work properly this because 
  // Another route definition within the AuthController class uses a similar or identical path pattern (/auth/signout) as the signout route. 
  //For example, if you have a route defined as @Get(':id') before the signout route, it might capture requests meant for the signout route because it also matches the pattern /auth/signout.
  @Get('signout')
  signout(@Res() res) {
    return this.authService.SignOut(res);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }


  @Post("signup")
  signup(@Body() dto:AuthDto){
    return this.authService.SignUp(dto);
  }

  @Post("signin")
  signin(@Body() dto:AuthDto , @Req() req  , @Res() res ){
    return this.authService.SignIn(dto,req,res);
  }

}
