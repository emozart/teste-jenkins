
import {ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
export class UserType {
  
  @Field(() => ID)
  id: number;

  @Field()
  readonly firstName: string;

  @Field()
  readonly lastName: string;

  @Field()
  readonly isActive: boolean;
}
