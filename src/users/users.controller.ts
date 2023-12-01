import { Body, Controller,Delete,Get,NotFoundException,Param,Patch,Post, Query, Session,UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { USerDto } from './dtos/user.dto';
import { AuthService } from '../auth/auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { User } from './user.entity';
import { Auth } from '../auth/auth.entity';

@Controller('auth')
@Serialize(USerDto)

export class UsersController {

    constructor(
        private usersService : UsersService,
        private authService:AuthService
        ){}


    @Get('/colors/:color')
    setColor(@Param('color') color:string, @Session() session:any){
        console.log('Session  inainte : ', session)
        console.log('Session.color inainte: ', session.color)
        session.color = color;
        console.log('Session dupa setare: ', session)
        console.log('Session.color dupa setare :  ', session.color)
    }

    @Get('/colors')
    getColor(@Session() session:any){
        return session.color
    }

    @Get('/userLoggedIn')
    getUserLoggedIn(@Session() session:any){
        console.log(this.usersService.findOne(session.userId))
        return this.usersService.findOne(session.userId)
    }

    @Get('/whoami')
    @UseGuards(AuthGuard)
    whoAmI(@CurrentUser() user:User){
        return user;
    }


    @Post('/signup')
        async createUser(@Body() body:CreateUserDto , @Session() session: any){
            const user = await this.authService.signup(body.email,body.password);
            session.userId = user.id;
            return user;

            }


    @Post ('/signout')
    signOut(@Session() session:any){
        session.userId = null;
    }

    @Post('/signin')
  async signinUser(@Body() body:CreateUserDto , @Session() session: any){
        const user= await this.authService.signin(body.email,body.password);
        session.userId = user.id;
        return user;

    }

    @Get('/:id')
    async findUser(@Param('id') id:string){
        console.log('Handler is running')
        const user = await this.usersService.findOne(parseInt(id))

        if(!user){
            throw new NotFoundException('USerul nu a fost gasit');
        }
        return user;
    }


    @Get('/findAllUsers')
    findAllUsers(@Query('email') email:string ){
        this.usersService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id:string){
        return this.usersService.remove(parseInt(id))
    }


    @Patch('/:id')
    updateUser(@Param('id') id:string,  @Body() body: UpdateUserDto){
        this.usersService.update(parseInt(id),body)
    }




}

