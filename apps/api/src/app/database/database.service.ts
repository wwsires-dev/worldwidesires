import { Injectable } from "@nestjs/common";
import { config, ConnectionPool, connect, ISqlType } from "mssql";

export interface SprocParam {
	name: string;
	type: ISqlType;
	value: unknown;
}

@Injectable()
export class DatabaseService {
	private readonly dbConfig: config = {
		server: "siredb.westus.cloudapp.azure.com",
		database: "TheRing",
		user: "TheRingService",
		password: "Br33d$55",
		pool: {
			max: 10,
			min: 0,
			idleTimeoutMillis: 30000,
		},
		options: {
			encrypt: true,
			trustServerCertificate: true,
			trustedConnection: true,
		},
	};
	private conn: ConnectionPool;

	constructor() {
		this.conn = new ConnectionPool(this.dbConfig);
		this.Connect();
	}

	async Connect() {
		this.conn = await connect(this.dbConfig);
	}

	Execute(sproc: string, params?: SprocParam[]) {
		if (params) {
			const request = this.conn.request();

			params.forEach((param) => {
				request.input(param.name, param.type, param.value);
			});

			return request.execute(sproc);
		} else {
			return this.conn.request().execute(sproc);
		}
	}

	Query(queryStr: string) {
		const request = this.conn.request();

		return request.query(queryStr);
	}
}
