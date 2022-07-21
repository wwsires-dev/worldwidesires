import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Animal } from './animal.entity';
import { AnimalService } from './animal.service';

interface MarketingListRequest {
  breed_group: string;
  gender: string;
  marketing_groups: string[]
}

interface CustomListRequest {
  ids: string[]
}

@Controller('animal')
export class AnimalController {
  constructor(private readonly animalService: AnimalService){}

  @Get(':gender/:id')
  GetAnimalById(@Param() params): Promise<Animal> {
    return this.animalService.FindById(params.id, params.gender);
  }

  @Post('marketing/list')
  GetMarketingAnimalList(@Body() body: MarketingListRequest): Promise<Animal[]> {
    return this.animalService.GetMarketingAnimalList(body.breed_group, body.gender, body.marketing_groups);
  }

  @Post('custom/list')
  GetCustomAnimalList(@Body() body: CustomListRequest): Promise<Animal[]> {
    return this.animalService.GetCustomAnimalList(body.ids);
  }
}
