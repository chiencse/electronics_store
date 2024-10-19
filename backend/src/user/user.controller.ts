import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    UseInterceptors,
    ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { SignInDto } from './dto/signIn.dto';
import { CurrentUser } from '../common';
import { AuthPayload } from './entities/user.entity';
import { AuthGuard } from '../auth/guard/jwt.guard';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('User')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/signup')
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({
        status: 201,
        description: 'The user has been successfully created.',
    })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    async signIn(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @Post('/signin')
    @ApiOperation({
        summary: 'Login user',
        description:
            'Login user with email or username, delete field email or username to signIn',
    })
    @ApiResponse({
        status: 200,
        description: 'The user has been successfully logged in.',
    })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    async login(@Body() signInDto: SignInDto) {
        return this.userService.login(signInDto);
    }

    @Patch('/update')
    @ApiOperation({ summary: 'Update user details' , description:'Update user details, only update field have value, delete field dont want to update'})
    @ApiResponse({
        status: 200,
        description: 'The user has been successfully updated.',
    })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard)
    async update(
        @Body() updateUserDto: UpdateUserDto,
        @CurrentUser() crtUser: AuthPayload,
    ) {
        return this.userService.update(updateUserDto, crtUser);
    }
}
