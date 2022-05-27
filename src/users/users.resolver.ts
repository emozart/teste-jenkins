import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserType } from './user.dto';
import { CreateUserInput, UpdateUserInput } from './user.input';
import { UsersService } from './users.service';


@Resolver()
export class UserResolver {
    
    constructor(private readonly usersService: UsersService) {
        
    }

    @Query(() => [UserType],{ name: 'findAllUsers' })
    async findAll() {
        return this.usersService.findAll();
    }

    @Query(() => UserType,{ name: 'findOneUser' })
    async findOne(@Args('id', { type: () => Int }) id: string){
        return this.usersService.findOne(id);
    }

    @Mutation(() => UserType,{ name: 'createUser' })
    async create(@Args('input') input: CreateUserInput ) {
        return this.usersService.create(input);
    }

    @Mutation(returns => UserType,{ name: 'updateUser' })
    async update(@Args('id') id: number, @Args('input') input:  UpdateUserInput ) {
        return await this.usersService.update(id, input).then(result=>{
            if (result) {
                return result;
            }
            return null;
        }).catch(error=> {return error});
    }

    @Mutation(returns => String,{ name: 'deleteUser' })
    async delete(@Args('id') id: number) {
        const result = await this.usersService.delete(id).then(result=>{
            if (result) {
                return 'Ok';
            }
            return 'error';
        }).catch(error=> {return error});
    }

}