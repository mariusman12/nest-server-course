import { Module } from '@nestjs/common';
import { PowerService } from './power.service';

@Module({
  providers: [PowerService],
  exports:[PowerService] // facem sa fie vizibil pentru ca initial este private
  // deci inseamna ca e accesibil doar pt modulul acesta 
})
export class PowerModule {}
