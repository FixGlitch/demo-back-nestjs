import { Module } from '@nestjs/common';
import { UserService } from '../user/user.usecase';
import { MongoDataServices } from '../../infrastructure/data-services/mongoDB/mongo-data-services.service';
import { DbModule } from '../../infrastructure/data-services/mongoDB/db.module';

@Module({
  imports: [DbModule],
  providers: [UserService, MongoDataServices],
  exports: [UserService],
})
export class UserUsecaseModule {}
