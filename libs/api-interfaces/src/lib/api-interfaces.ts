export interface TraitMetaResponse {
  Id: string;
  Category: string;
  Trait: string;
  LegacyName: string;
  Format: string;
  Label: string;
  HeaderLabel: string;
  Description: string;
  CategoryOrder: number;
  DisplayOrder: number;
  IsPublished: boolean;
  Country: string;
}

export interface ProofResponse {
  AnimalId: string;
  TraitId: string;
  TraitValue: number;
}

export interface AnimalResponse {
  Id: string;
  RegId: string;
  NaabCode: string;
  ShortName: string;
  RegName: string;
  Recessives: string;
  Haplotypes: string;
  YoungSire: string;
  Gender: string;
  DateOfBirth: string;
  IsDead: boolean;
  Breed: string;
  BreedSort: string;
  BreedGroup: string;
  Controller: number;
  Stud: number;
  Country: string;
  UpdateDate: string;
}
