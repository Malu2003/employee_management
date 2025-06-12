import { Module } from '@nestjs/common';
import { UsersService } from './service/users/users.service';
import { UsersController } from './controllers/users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { Profile } from 'src/entities/Profile';
import { Post } from 'src/entities/Post';
@Module({
  imports:[TypeOrmModule.forFeature([User,Profile,Post])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
