import { Module } from '@nestjs/common';
import { ReportsModule } from '../reports/reports.module';
import { UsersModule } from '../users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Reports } from '../reports/reports.entity';

@Module({
  imports:[TypeOrmModule.forRoot({
      type:'sqlite',
      database:'db.sqlite',
      entities:[User],
      synchronize:true // only for development 
  }),UsersModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}


