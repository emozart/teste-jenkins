
import { Field, InputType } from "@nestjs/graphql";
// import { Upload } from "../core/Upload.scalar";

@InputType()
export class CreatePhotoInput {
    @Field()
    readonly name: string;
  
    @Field()
    readonly description: string;

    @Field()
    readonly filename: string;
  
    @Field()
    readonly isPublished: boolean;

    @Field()
    readonly views: number;

    @Field()
    readonly userId: number;

}

@InputType()
export class UpdatePhotoInput {

    @Field()
    readonly id: number;    

    @Field()
    readonly name: string;
  
    @Field()
    readonly description: string;

    @Field()
    readonly filename: string;
  
    @Field()
    readonly isPublished: boolean;

    @Field()
    readonly views: number;

    @Field()
    readonly userId: number;
}

// @InputType()
// export class UploadUserProfilePicInput {
//     @Field()
//     file : Uploadcls

// }