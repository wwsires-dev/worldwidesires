import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AnimalController } from './animal.controller';
import { AnimalService } from './animal.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AnimalController],
  providers: [
    AnimalService
  ]
})
export class AnimalModule {};
