import * as path from "node:path";
import { join } from "node:path";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CoveragediskEntity } from "./coverage/entity/coveragedisk.entity";
import { PrismaModule } from "./prisma/prisma.module";
import { PrismaService } from "./prisma/prisma.service";
import { UserModule } from "./user/user.module";

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "better-sqlite3",
			database: "db/sql",
			synchronize: true,
			entities: [CoveragediskEntity],
		}),
		UserModule,
		PrismaModule,
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, "../../canyon-platform", "dist"),
			exclude: ["/graphql/(.*)"],
		}),
		ConfigModule.forRoot({
			envFilePath: path.resolve(__dirname, "../../../.env"),
		}),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			autoSchemaFile: "schema.gql",
			driver: ApolloDriver,
		}),
	],
	controllers: [AppController],
	providers: [AppService, PrismaService],
})
export class AppModule {}
