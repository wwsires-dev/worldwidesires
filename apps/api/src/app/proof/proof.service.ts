import { Injectable } from "@nestjs/common";
import { ProofResponse, TraitMetaResponse } from "@worldwidesires/api-interfaces";
import { IProcedureResult, IResult } from "mssql";
import { DatabaseService } from "../database/database.service";

@Injectable()
export class ProofService {
	constructor(private databaseService: DatabaseService) {}

	async GetProofTraits(traits: string[], animalIds: string[]): Promise<ProofResponse[]> {
		const traitsStr = traits.join(",");
		const animalIdsStr = animalIds.join(",");

		const sql = `
      SELECT
        AnimalId,
        TraitId,
        TraitValue
      FROM Api.AnimalProof('${traitsStr}', '${animalIdsStr}');
    `;

		return this.databaseService.Query(sql).then((results: IResult<ProofResponse>) => {
			const res: ProofResponse[] = results.recordsets[0];
			return res;
		});
	}

	GetTraitMeta(): Promise<TraitMetaResponse[]> {
		return this.databaseService.Execute("Api.MetaAll").then((results: IProcedureResult<TraitMetaResponse>) => {
			const res: TraitMetaResponse[] = results.recordsets[0];
			return res;
		});
	}
}
