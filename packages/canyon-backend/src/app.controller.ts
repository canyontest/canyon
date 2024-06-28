import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { PrismaService } from "./prisma/prisma.service";
// import * as process from "node:process";

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly prisma: PrismaService,
	) {
		console.log(process.env.DATABASE_URL);
	}

	@Get("/vi/health")
	getHello() {
		const a = "hha";
		return this.prisma.user.findMany({
			where: {},
		});
		// return a
	}
}
