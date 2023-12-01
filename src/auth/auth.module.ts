import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule], // Importați UsersModule aici 
  providers: [AuthService],
})
export class AuthModule {}
