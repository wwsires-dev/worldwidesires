import { Provider } from "@nestjs/common";
import { DataSource } from "typeorm";
import { Animal } from "./animal.entity";

export const animalProviders: Provider[] = [
  {
    provide: "ANIMAL_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Animal),
    inject: ["DEV_THERING_DATA_SOURCE"],
  }
]
