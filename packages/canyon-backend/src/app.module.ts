import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { PrismaService } from "./prisma/prisma.service";
@Module({
	imports: [
		PrismaModule,
		ConfigModule.forRoot({
			envFilePath: "../../.env",
		}),
	],
	controllers: [AppController],
	providers: [AppService, PrismaService],
})
export class AppModule {}
