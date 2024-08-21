import { Test, TestingModule } from '@nestjs/testing';
import { DosarMedicalController } from './dosar-medical.controller';

describe('DosarMedicalController', () => {
  let controller: DosarMedicalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DosarMedicalController],
    }).compile();

    controller = module.get<DosarMedicalController>(DosarMedicalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
