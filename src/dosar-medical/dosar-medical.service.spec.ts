import { Test, TestingModule } from '@nestjs/testing';
import { DosarMedicalService } from './dosar-medical.service';

describe('DosarMedicalService', () => {
  let service: DosarMedicalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DosarMedicalService],
    }).compile();

    service = module.get<DosarMedicalService>(DosarMedicalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
