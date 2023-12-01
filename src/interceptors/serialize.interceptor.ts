import {
    UseInterceptors,
    NestInterceptor,
    CallHandler,
    ExecutionContext
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { plainToClass, plainToInstance } from 'class-transformer'
import { USerDto } from 'src/users/dtos/user.dto'

interface ClassConstructor{
    new (...args: any[]):{}
}


export function Serialize(dto:ClassConstructor){
    return UseInterceptors(new SerializeInterceptor(dto))
}


export class SerializeInterceptor implements NestInterceptor{ 
    constructor(private dto:any){

    }

    intercept(context: ExecutionContext,handler :CallHandler): Observable<any>{
        //Run something before de request is handle by req handler
       // console.log('Am rulat inainte de handler', context)

        
        return handler.handle().pipe(
            map((data:any) =>{
                // Run something before the response is sent out
                    return plainToInstance(this.dto ,data, {
                        excludeExtraneousValues:true, // se asigura ca totul merge comform 
                        //de fiecare data cand avem un userdto si inceacrca sa il faca in plain json
                        //o sa faca share sau sa arate doar specificatiile care sunt marcate de directive @Expose()
                        // deci daca sunt altele vor fi excluse
                    })
            })
        )
    }


}