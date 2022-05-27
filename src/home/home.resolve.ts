import { HttpStatus, Res, UseFilters, UseGuards } from '@nestjs/common';
import { Unprotected } from 'nest-keycloak-connect';
import { Resolver, Query, Mutation, Args, Int, InputType, Field, ObjectType } from '@nestjs/graphql';
import { KeycloakService } from '../keycloak/keycloak.service';
import * as atob from 'atob';

@InputType()
export class ValidationLoginUserInput {
    
    @Field()
    userName: string;

    @Field()
    password: string;
}

@ObjectType()
export class AccessTokenType {
  
  @Field()
  readonly access_token: string;

  @Field()
  readonly refresh_token: string;

  @Field()
  readonly expires_in: number;

  @Field()
  readonly refresh_expires_in: number;

  @Field()
  readonly token_type: string;
}

@Resolver()
export class HomeResolver  { 

    constructor(readonly keycloakService:KeycloakService){

    }

    @Unprotected()
    @Mutation(returns => AccessTokenType,{ name: 'login' })
    async login(@Args('input') input:  ValidationLoginUserInput){
        let result = await this.keycloakService.getKeycloakToken();
        let itens = JSON.parse(atob(result.split('.')[1]));
        return { access_token: result } as AccessTokenType
    }

    
    @Query(() => String)
    sayHello(): string {
      return 'Hello World!';
    }
}