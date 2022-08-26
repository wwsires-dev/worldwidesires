import { Injectable } from "@nestjs/common";
import { AnimalResponse } from "@worldwidesires/api-interfaces";
import { Bit, Int, IProcedureResult, MAX, NVarChar, UniqueIdentifier } from "mssql";
import { DatabaseService, SprocParam } from "../database/database.service";
import { FormatDate } from "../utils/functions/format-date";

@Injectable()
export class AnimalService {
	constructor(private databaseService: DatabaseService) {}

	GetAnimalById(id: string, gender: string): Promise<AnimalResponse> {
		const sql = `
      SELECT
        Id,
        RegId,
        dbo.GetPrimaryNaabCode(Id) NaabCode,
        ShortName,
        RegName,
        Gender,
        DateOfBirth,
        IsDead,
        Breed,
        BreedGroup,
        UpdateDate
      FROM dbo.GetAnimalBase('${id}', '${gender}');
    `;

		return this.databaseService
			.Query(sql)
			.then((results) => {
				const res: AnimalResponse = results.recordset[0];
				res.DateOfBirth = FormatDate(res.DateOfBirth);
				return res;
			})
			.catch((err) => {
				return err;
			});
	}

	GetMarketingAnimalList(breedGroup: string, gender: string, marketingGroups: string[]): Promise<AnimalResponse[]> {
		const mktg = marketingGroups.join(",");

		const sql = `
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
      FROM Api.BaseAnimal('${breedGroup}','${gender}','${mktg}');
    `;

		return this.databaseService
			.Query(sql)
			.then((results) => {
				const res: AnimalResponse[] = results.recordset;
				res.forEach((record) => {
					record.DateOfBirth = FormatDate(record.DateOfBirth);
				});
				return res;
			})
			.catch((err) => {
				return err;
			});
	}

	GetCustomAnimalList(animalIds: string[]) {
		const bullIds = { BullIds: animalIds };
		const ids = JSON.stringify(bullIds);

		const sprocParams: SprocParam[] = [
			{
				name: "AdditionalBullIds",
				type: NVarChar(MAX),
				value: ids,
			},
			{
				name: "SourceList",
				type: NVarChar(100),
				value: "",
			},
			{
				name: "OrderByColumns",
				type: NVarChar(MAX),
				value: "Id ASC",
			},
			{
				name: "OffSet",
				type: Int(),
				value: -1,
			},
			{
				name: "IncludeNxGen",
				type: Bit(),
				value: 1,
			},
		];

		return this.databaseService
			.Execute("Api.AnimalList", sprocParams)
			.then((results) => {
				const res: AnimalResponse[] = results.recordset;
				res.forEach((record) => {
					record.DateOfBirth = FormatDate(record.DateOfBirth);
				});
				return res;
			})
			.catch((err) => {
				return err;
			});
	}

	GetAnimalDetail(animalId: string) {
		const sprocParams: SprocParam[] = [
			{
				name: "AnimalKey",
				type: NVarChar(100),
				value: animalId,
			},
			{
				name: "ProofPeriodId",
				type: UniqueIdentifier(),
				value: null,
			},
			{
				name: "LanguageCode",
				type: NVarChar(100),
				value: "EN",
			},
			{
				name: "IncludeProof",
				type: Bit(),
				value: 1,
			},
			{
				name: "IncludeLactation",
				type: Bit(),
				value: 1,
			},
			{
				name: "IncludeSons",
				type: Bit(),
				value: 1,
			},
		];

		return this.databaseService
			.Execute("Api.AnimalData", sprocParams)
			.then((results) => {
				const res: any = results.recordsets;
				// res.forEach(record => {
				//   record.DateOfBirth = FormatDate(record.DateOfBirth);
				// });
				return res;
			})
			.catch((err) => {
				return err;
			});
	}
}
