import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User';
import { UsersModule } from './users/users.module';
import { Profile } from './entities/Profile';
import { Post } from './entities/Post';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ TypeOrmModule.forRoot({
    type:'mysql',
    host:'localhost',
    port:3306,
    username:'root',
    password:'root',
    database:'nest',
    entities: [User,Profile,Post],
    synchronize:true,
  }), UsersModule,AuthModule], //databse credentials ivde aan + entities(tables) of db
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
