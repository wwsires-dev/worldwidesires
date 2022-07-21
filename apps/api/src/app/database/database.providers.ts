import { Provider } from "@nestjs/common";
import { DataSource } from "typeorm";

export const databaseProviders: Provider[] = [
  {
    provide: "DEV_THERING_DATA_SOURCE",
    useFactory: async () => {
      const dataSource = new DataSource({
        type: "mssql",
        host: "siredbdev.westus.cloudapp.azure.com",
        port: 1433,
        username: "TheRingService",
        password: "Br33d$55",
        database: "TheRing",
        synchronize: false,
        extra: {
          validateConnection: false,
          trustServerCertificate: true
        },
      });

      return dataSource.initialize();
    }
  },
  // {
  //   provide: "DEV_DMZ_DATA_SOURCE",
  //   useFactory: async () => {
  //     const dataSource = new DataSource({
  //       type: "mssql",
  //       host: "stagingdev.westus.cloudapp.azure.com",
  //       port: 1433,
  //       username: "TheRingService",
  //       password: "Br33d$55",
  //       database: "DMZ",
  //       synchronize: false,
  //       extra: {
  //         validateConnection: false,
  //         trustServerCertificate: true
  //       },
  //     });

  //     return dataSource.initialize();
  //   }
  // },
]
