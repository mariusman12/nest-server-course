import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';


describe('UsersController', () => {
  let controller: UsersController;
  let fakeUserService: Partial<UsersService>
  let fakeAuthService: Partial<AuthService>

  beforeEach(async () => {

    fakeUserService = {
      findOne : (id : number) =>{return Promise.resolve({id,email:'asdasd@gasd.ro',password:'asdasd'} as User)},
      find : (email : string) =>{ return Promise.resolve([{id:1,email, password:'adf'} as User])} ,
      // remove : () =>{},
      // update : () =>{}
    }
    // fakeAuthService= {
    //   signup : () =>{
    //   }
    //   signin : () =>{

    //   }

    // },

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue:fakeUserService
        },
        {
          provide: AuthService,
          useValue:fakeAuthService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('findUser throws an error if user with given id is not found', async () => {
    fakeUserService.findOne = () => null;
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  });


  it('findUser  returns a single user with the give id', async () =>{
      const user = await controller.findUser("2");

      expect(user).toBeDefined()
  })

});
