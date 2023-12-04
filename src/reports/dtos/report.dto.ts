import { Expose,Transform } from "class-transformer";
import { User } from "src/users/user.entity";


export class ReportDto{
    @Expose()
    id:number;

    @Expose()
    price:number;

    @Expose()
    year:number;

    @Expose()
    lng:number;

    @Expose()
    lat:number;

    @Expose()
    make:string;

    @Expose()
    model:string;

    @Expose()
    mileage:number;

    @Expose()
    approved:boolean;

    @Transform(({obj }) => obj.user.id) // luam entitatea originala in obj. Practic avem obj fiind tot raspunsul primit de la reports controler  si de la el luam doar user.id
    @Expose()
    userId:number

}