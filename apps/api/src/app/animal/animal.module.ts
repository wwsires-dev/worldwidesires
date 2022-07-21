import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AnimalController } from './animal.controller';
import { animalProviders } from './animal.provider';
import { AnimalService } from './animal.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AnimalController],
  providers: [
    ...animalProviders,
    AnimalService
  ]
})
export class AnimalModule {};
