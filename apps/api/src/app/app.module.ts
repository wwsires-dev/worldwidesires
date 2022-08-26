import { Module } from "@nestjs/common";
import { AnimalModule } from "./animal/animal.module";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { ProofModule } from "./proof/proof.module";

@Module({
	imports: [DatabaseModule, AnimalModule, ProofModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
