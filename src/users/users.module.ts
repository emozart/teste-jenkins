import { Module, Controller, forwardRef } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { UsersService } from './users.service';
import { usersProviders } from './user.providers';
import { UserResolver } from './users.resolver';

@Module({
  imports: [
    DatabaseModule,
  ],
  providers:[UserResolver,UsersService, ...usersProviders],
  exports:[UsersService]
})
export class UsersModule {}