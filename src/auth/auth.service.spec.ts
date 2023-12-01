import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { User } from "src/users/user.entity";
import { BadRequestException, NotFoundException } from '@nestjs/common';
describe ('Auth service', () =>{
            
        let service: AuthService;
        let fakeUserService: Partial<UsersService>;

        beforeEach( async () =>{
                //Create copy of the user service
                const users: User[] = [];
                fakeUserService ={ // facem o versiune aprtiala pentru user service 
                    find: (email:string) =>{
                        const filteredUsers = users.filter(user => user.email === email)
                        return Promise.resolve(filteredUsers)
                    },
                    create : (email:string, password:string) => {
                        const user= {id:Math.floor(Math.random()*99999), email,password} as User
                        users.push(user)
                        return Promise.resolve(user);
                    }           
                }    
                const module = await Test.createTestingModule({
                    providers:[AuthService,
                    {
                        provide:UsersService,
                        useValue:fakeUserService
                    }
                    ]
                }).compile();
                service= module.get(AuthService)
              })
        it('can create an instante of auth service', async  () =>{
            expect(service).toBeDefined()
        })
        it('Create a newq user with a salted and hash passsword', async  () =>{
            const user = await service.signup("marius@gmail.com", "asdasd")
            
            expect (user.password).not.toEqual('asdasd')
            const [salt,hash] = user.password.split('.')
            expect(salt).toBeDefined();
            expect(hash).toBeDefined();
        })
        it('throws an error if user signs up with email that is in use', async () => {
            await service.signup('asdf@asdf.com', 'asdf');
            await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
              BadRequestException,
            );
          });
          it('throws if signin is called with an unused email', async () => {
            await expect(
              service.signin('asdflkj@asdlfkj.com', 'passdflkj'),
            ).rejects.toThrow(NotFoundException);
          });
          it('throws if an invalid password is provided', async () => {
            await service.signup('laskdjf@alskdfj.com', 'password');
            await expect(
              service.signin('laskdjf@alskdfj.com', 'laksdlfkj'),
            ).rejects.toThrow(BadRequestException);
          });

              it('Return a use if correct password is provided', async () =>{
                await service.signup('pentrutest@gmail.com','2221')
        
                const user = await service.signin("pentrutest@gmail.com","2221")
                expect(user).toBeDefined();
              })
})
