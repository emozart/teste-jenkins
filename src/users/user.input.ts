import { Field, InputType } from "@nestjs/graphql";



@InputType()
export class CreateUserInput {
    @Field()
    readonly firstName: string;

    @Field()
    readonly lastName: string;
  
    @Field()
    readonly isActive: boolean;
}

@InputType()
export class UpdateUserInput {

    @Field()
    readonly id: number;
  
    @Field()
    readonly firstName: string;
  
    @Field()
    readonly lastName: string;
  
    @Field()
    readonly isActive: boolean;
}