import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private repo: Repository<User>) {  }
    // avem private ca sa putem facem aia // numele argumentelui e repo // type annoation e repository 
    // repo  is going to be an instante of typeorm repository that deals with instances of user this repository is going to handle user.
    // Si prima parte :  aia o sa zica depozitiului de injection system ca o sa avem nevoie de user repository



    create (email:string, password:string){
         const user =  this.repo.create({email,password})
         return this.repo.save(user) 

    }



    findOne(id: number){
        if (!id){
            return null;
        }
        return this.repo.findOneBy({id})
    }
    
    find(email:string){
        return this.repo.find({ where : {email}})
    }
    async update(id: number, attrs: Partial<User>){
        const user = await this.findOne(id);
        if (!user){
            throw new NotFoundException('');
        }
        Object.assign(user,attrs)
        return this.repo.save(user)
    }
    async remove(id: number){
        const user = await this.findOne(id)

        if (!user){
            throw new NotFoundException('Userul nu exista')
        }
        return this.repo.remove(user)
    }


    
    async updateAdminStatus(id: number, attrs: Partial<User>){
        const user = await this.findOne(id);
        if (!user){
            throw new NotFoundException('');
        }
        Object.assign(user,attrs)
        return this.repo.save(user)
    }
}
