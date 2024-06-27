import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller()
export class UserController {
	constructor(private readonly prismaService: PrismaService) {}
	// @UseGuards(JwtAuthGuard)
	@Get("/api/user")
	getHello() {
		return this.prismaService.user.findFirst({
			where: {},
		});
	}
}
