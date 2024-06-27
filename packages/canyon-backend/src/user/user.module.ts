import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { ListUserService } from "./crud/list-user.service";
import { UserController } from "./user.controller";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";
import {ListGitProviderService} from "./services/list-git-provider.service";

@Module({
	imports: [PrismaModule],
	controllers: [UserController],
	providers: [UserResolver, UserService, ListUserService,ListGitProviderService],
	exports: [UserService],
})
export class UserModule {}
