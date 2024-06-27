import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class GitProvider {
	@Field()
	id: string;

	@Field()
  url: string;

	@Field()
  clientID: string;

	@Field()
  clientSecret: string;

	@Field()
  type: string;

	@Field()
  name: string;

	@Field(()=>Boolean)
  disabled: boolean;

	@Field()
	createdAt: Date;

  @Field()
  updatedAt: Date;
}
