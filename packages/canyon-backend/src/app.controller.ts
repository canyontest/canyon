import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import {PrismaService} from "./prisma/prisma.service";

@Controller()
export class AppController {
	constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService
  ) {}

	@Get()
	getHello() {
		const a = "hha";
		return this.prisma.user.findMany({
      where: {}
    });
	}
}
