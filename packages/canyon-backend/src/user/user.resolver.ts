import { UseGuards } from "@nestjs/common";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "./user.model";

// import { GqlUser } from '../decorators/gql-user.decorator';
// import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { ListUserService } from "./crud/list-user.service";
import { UserService } from "./user.service";
import {GitProvider} from "./models/git-provider.model";
import {ListGitProviderService} from "./services/list-git-provider.service";

@Resolver(() => User)
export class UserResolver {
	constructor(
		private readonly userService: UserService,
		private readonly listUserService: ListUserService,
    private readonly listGitProviderService: ListGitProviderService,
	) {}

	// @Query(() => User, {
	//   description: '提供执行此查询的用户的详细信息（通过授权 Bearer 标头）',
	// })
	// @UseGuards(GqlAuthGuard)
	// me(@GqlUser() user: User) {
	//   return this.userService.convertDbUserToUser(user);
	// }

	@Query(() => [User], {
		description: "列出所有用户",
	})
	// @UseGuards(GqlAuthGuard)
	listUser() {
		return this.listUserService.invoke();
	}

  @Query(() => [GitProvider], {
    description: "列出所有提供商",
  })
  listGitProvider() {
    return this.listGitProviderService.invoke();
  }

	// @Mutation(() => User, {
	//   description: '关注项目',
	// })
	// @UseGuards(GqlAuthGuard)
	// favorProject(
	//   @GqlUser() user: User,
	//   @Args('projectID', { type: () => ID }) projectID: string,
	//   @Args('favored', { type: () => Boolean }) favored: boolean,
	// ) {
	//   return this.userService.favorProject(user, projectID, favored);
	// }
}
