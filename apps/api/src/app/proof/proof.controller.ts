import { Body, Controller, Get, Post } from '@nestjs/common';
import { TraitMetaResponse } from '@worldwidesires/api-interfaces';
import { ProofService } from './proof.service';

interface TraitsRequest {
  traits: string[];
  animalIds: string[];
}

@Controller('proof')
export class ProofController {
  constructor(private readonly proofService: ProofService) {}

  @Post("traits")
  GetTraits(@Body() body: TraitsRequest) {
    return this.proofService.GetProofTraits(body.traits, body.animalIds);
  }

  @Get("trait_meta")
  GetTraitMeta(): Promise<TraitMetaResponse[]> {
    return this.proofService.GetTraitMeta();
  }
}
