

import {ObjectType, Field, ID } from "@nestjs/graphql";
import { UserType } from "../users/user.dto";

@ObjectType()
export class PhotoType {

  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  filename: string;

  @Field()
  views: number;

  @Field()
  isPublished: boolean;

  @Field()
  user: UserType

  @Field()
  userId: number;

}


@ObjectType('UserUploadProfilePicType')
export class UserUploadProfilePicType {
    @Field()
    success : boolean;
}