import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AnimalService } from "./animal.service";

interface MarketingListRequest {
	breed_group: string;
	gender: string;
	marketing_groups: string[];
}

interface AnimalRequest {
	gender: string;
	id: string;
}

interface AnimalDetailRequest {
	id: string;
}

interface CustomListRequest {
	ids: string[];
}

@Controller("animal")
export class AnimalController {
	constructor(private readonly animalService: AnimalService) {}

	@Get(":gender/:id")
	GetAnimalById(@Param() params: AnimalRequest) {
		return this.animalService.GetAnimalById(params.id, params.gender);
	}

	@Get(":id")
	GetAnimalDetail(@Param() params: AnimalDetailRequest) {
		return this.animalService.GetAnimalDetail(params.id);
	}

	@Post("marketing/list")
	GetMarketingAnimalList(@Body() body: MarketingListRequest) {
		return this.animalService.GetMarketingAnimalList(body.breed_group, body.gender, body.marketing_groups);
	}

	@Post("custom/list")
	GetCustomAnimalList(@Body() body: CustomListRequest) {
		return this.animalService.GetCustomAnimalList(body.ids);
	}
}
