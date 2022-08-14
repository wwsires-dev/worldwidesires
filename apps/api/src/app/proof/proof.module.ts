import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ProofController } from './proof.controller';
import { ProofService } from './proof.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProofController],
  providers: [
    ProofService
  ]
})
export class ProofModule {};
