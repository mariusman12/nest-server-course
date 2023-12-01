import {AfterInsert,AfterRemove,AfterUpdate ,Entity,Column,PrimaryGeneratedColumn} from 'typeorm'




@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;


    @Column()
    password:string;


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