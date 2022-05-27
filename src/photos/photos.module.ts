import { Module, Controller } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { PhotosResolver } from './photos.resolver';
import { PhotosService } from './photos.service';
import { photosProviders } from './photos.providers'

import { UsersModule } from '../users/users.module';

@Module({
  imports: [DatabaseModule,UsersModule],
  providers:[PhotosResolver,PhotosService, ...photosProviders]
})
export class PhotosModule {}