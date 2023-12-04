import { Report } from 'src/reports/report.entity';
import {AfterInsert,AfterRemove,AfterUpdate , OneToMany,Entity,Column,PrimaryGeneratedColumn} from 'typeorm'




@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;


    @Column()
    password:string;

    @Column({default: false})
    admin:boolean

    @OneToMany(() => Report, (report) =>report.user)
    reports:Report[]

    @AfterInsert()
    logInsert() {
        console.log('Am inserat userul cu id', this.id, 'si cu email:', this.email)
    }
    @AfterUpdate()
    logUpdate(){
        console.log('Am modificat userul cu id', this.id)
    }

    @AfterRemove()
    logRemove(){
        console.log('Am sters userul cu id', this.id)
    }

}