import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { FormatDate } from "../utils/functions/format-date";
import { Animal } from "./animal.entity";

@Injectable()
export class AnimalService {

  constructor(
    @Inject("ANIMAL_REPOSITORY")
    private animalRepository: Repository<Animal>,
  ) {}

  async FindById(id: string, gender: string): Promise<Animal> {

    const animal = await this.animalRepository.query(`
      SELECT
        Id,
        RegId,
        ShortName,
        RegName,
        Gender,
        DateOfBirth,
        IsDead,
        Breed,
        BreedGroup,
        UpdateDate
      FROM dbo.GetAnimalBase('${id}', '${gender}');
    `);

    animal.map((a: Animal) => {

      a.DateOfBirth = FormatDate(a.DateOfBirth);

      return a;
    });

    return animal;
  }

  async GetMarketingAnimalList(breedGroup: string, gender: string, marketingGroups: string[]) {

    const mktg = marketingGroups.join(",");

    const animals = await this.animalRepository.query(`
      SELECT
        Id,
        Breed,
        BreedSort,
        BreedGroup,
        Gender,
        DateOfBirth,
        ShortName,
        RegName,
        RegId,
        NaabCode,
        IsDead,
        UpdateDate,
        Controller,
        Stud,
        Country
      FROM Api.BaseAnimal('${breedGroup}','${gender}','${mktg}')
    `);

    animals.map((a: Animal) => {

      a.DateOfBirth = FormatDate(a.DateOfBirth);

      return a;
    });

    return animals;

  }

  async GetCustomAnimalList(animalIds: string[]) {

    // Format strings with "" for SQL Server.
    const ids = animalIds.map((id) => `"${id}"`).join(",");

    // We are just using this sproc for the AdditionalBullIds to get a custom list.
    const animals = await this.animalRepository.query(`
      DECLARE @AdditionalBullIds NVarchar(max),
        @SourceList NVarchar(100),
        @OrderByColumns NVarchar(max),
        @OffSet INT,
        @IncludeNxGen BIT;

      SET @AdditionalBullIds = '{"BullIds":[${ids}]}';
      SET @SourceList = '';
      SET @OrderByColumns = 'Id ASC';
      SET @OffSet = -1;
      SET @IncludeNxGen = 0;

      EXECUTE Api.AnimalList
        @SourceList,
        @OrderByColumns,
        @AdditionalBullIds,
        @OffSet,
        @IncludeNxGen;
    `);

    animals.map((a: Animal) => {

      a.DateOfBirth = FormatDate(a.DateOfBirth);

      return a;
    });

    return animals;
  }
}
