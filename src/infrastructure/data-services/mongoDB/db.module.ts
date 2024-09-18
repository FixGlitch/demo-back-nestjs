import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { MongoDataServices } from './mongo-data-services.service';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/database'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [MongoDataServices, UserService],
  exports: [MongoDataServices, UserService],
})
export class DbModule {}
