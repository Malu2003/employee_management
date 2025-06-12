import { HttpException, HttpStatus, Injectable  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/Post';
import { Profile } from 'src/entities/Profile';
import { User } from 'src/entities/User';
import { CreateUserParams, CreateUserPostParams, CreateUserProfileParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>,
      @InjectRepository(Post) private postRepository: Repository<Post>){}

    findUser() {
        return this.userRepository.find({ relations: ['profile','posts'] });
    }

   async createUser(createUserDto: CreateUserParams) {
   try {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
   } catch (error) {
    console.error('User creation error:', error); // Log the real error
    throw new Error('User creation failed');
   }
   }
 
async updateUser(id: number, updateUserDto: CreateUserParams) {
        console.log(`Service: Updating user ${id} with:`, updateUserDto);
        
        try {
            // First check if user exists
            const existingUser = await this.userRepository.findOneBy({ id });
            if (!existingUser) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            
            console.log('Existing user found:', existingUser);
            
            // Prepare update data
            const updateData = {
                ...updateUserDto
            };
            
            console.log('Update data prepared:', updateData);
            
            // Perform update
            const result = await this.userRepository.update(id, updateData);
            console.log('Update result:', result);
            
            if (result.affected === 0) {
                throw new HttpException('Update failed - no rows affected', HttpStatus.INTERNAL_SERVER_ERROR);
            }
            
            // Return updated user
            const updatedUser = await this.userRepository.findOne({
                where: { id },
                relations: ['profile', 'posts']
            });
            
            console.log('Updated user retrieved:', updatedUser);
            return updatedUser;
            
        } catch (error) {
            console.error('Update user error:', error);
            if (error instanceof HttpException) {
                throw error;}
            throw new HttpException('Failed to update user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

deleteUser(id:number){
  return this.userRepository.delete(id);
}

async createUserProfile(id:number, createUserProfileDetails:CreateUserProfileParams){
    const user = await this.userRepository.findOneBy({  id });
    if (!user)
      throw new HttpException('User not found so cannot create profile', HttpStatus.BAD_REQUEST,);

    const newProfile = this.profileRepository.create(createUserProfileDetails);
    const savedProfile = await this.profileRepository.save(newProfile);
    user.profile = savedProfile;
    return this.userRepository.save(user);
  }

  async createUserPost(id: number, createUserPostDetails:CreateUserPostParams) {
     const user = await this.userRepository.findOneBy({  id });
    if (!user)
      throw new HttpException('User not found so cannot create profile', HttpStatus.BAD_REQUEST,);

    const newPost = this.postRepository.create({...createUserPostDetails,user});
   return this.postRepository.save(newPost);
  }
  async findUserById(id: number) {
        const user = await this.userRepository.findOne({ 
            where: { id },
            relations: ['profile', 'posts'] 
        });
        
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        
        return user;
    }

}
 