import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { CreateUserPostDto } from 'src/users/dtos/CreateUserPost.dto';
import { Createuserprofile } from 'src/users/dtos/CreateUserProfile';
import { UsersService } from 'src/users/service/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}
    @Get()
    getUsers(){
        return this.usersService.findUser();    
    }
     @Get(':id')  
    getUserById(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findUserById(id);
    }
    
    @Post()
    createUser(@Body() createUserDto:CreateUserDto){
   return this.usersService.createUser(createUserDto);
    }

    @Put(":id")
    async updateUserById(
        @Param("id", ParseIntPipe) id: number,
        @Body() updateUserDto: CreateUserDto
    ) {
        console.log(`Updating user ${id} with data:`, updateUserDto);
        try {
            const result = await this.usersService.updateUser(id, updateUserDto);
            console.log('Update result:', result);
            return result;
        } catch (error) {
            console.error('Update error in controller:', error);
            throw error;
        }
    }
    
    @Delete(":id")
    deleteUserbyId(@Param("id",ParseIntPipe) id:number){
        return this.usersService.deleteUser(id);
    }

    @Post(':id/profiles')
createUserProfile(
    @Param("id", ParseIntPipe) id: number,
    @Body() createUserProfileDto: Createuserprofile
) {
    return this.usersService.createUserProfile(id, createUserProfileDto);
}

    @Post(':id/posts')
    createUserPost(@Param("id",ParseIntPipe) id:number, @Body() createUserPostDto:CreateUserPostDto){
        return this.usersService.createUserPost(id,createUserPostDto);
    }

    @UseGuards(AuthGuard('jwt'))
  @Get('protected')
  getProtectedResource() {
    return 'This is a protected route!';
  }
} 
 
