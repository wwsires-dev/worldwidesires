import { Entity, Column } from "typeorm"

enum Gender {
  M = "M",
  F = "F"
}

enum BreedGroup {
  Holstein = "Holstein",
  Color = "Color",
  Dairy = "Dairy",
  Beef = "Beef",
  Cross = "Cross"
}

enum YoungSire {
  G = "Genomic",
  NT = "NotTested",
  P = "Proven"
}

@Entity()
export class Animal {
  @Column({ length: 30 })
  Id: string;

  @Column({ length: 17 })
  RegId: string;

  @Column()
  NaabCode: string;

  @Column()
  ShortName: string;

  @Column()
  RegName: string;

  @Column()
  Recessives: string;

  @Column()
  Haplotypes: string;

  @Column({ enum: YoungSire })
  YoungSire: string;

  @Column({ enum: Gender })
  Gender: string;

  @Column({ type: "date" })
  DateOfBirth: string;

  @Column({ type: "bit"})
  IsDead: boolean;

  @Column({ length: 2 })
  Breed: string;

  @Column({ length: 2 })
  BreedSort: string;

  @Column({ enum: BreedGroup })
  BreedGroup: string;

  @Column()
  Controller: number;

  @Column()
  Stud: number;

  @Column()
  Country: string;

  @Column({ type: "datetime" })
  UpdateDate: string;
}
