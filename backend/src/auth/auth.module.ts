import { Module } from '@nestjs/common'; // <-- Add this line
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { Profile } from '../entities/Profile';
import { Post } from '../entities/Post';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from 'src/users/service/users/users.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './google.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User, Profile, Post]),
    JwtModule.register({
      secret: 'my_jwt_secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [GoogleStrategy, JwtStrategy, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}