import { Module } from '@nestjs/common';
import { DosarMedicalController } from './dosar-medical.controller';
import { DosarMedicalService } from './dosar-medical.service';

@Module({
  controllers: [DosarMedicalController],
  providers: [DosarMedicalService]
})
export class DosarMedicalModule {}
