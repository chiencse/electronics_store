import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    UseGuards,
    UseInterceptors,
    ClassSerializerInterceptor,
    UploadedFile,
    Param,
    Query,
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
// import { AuthGuard } from './guard/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesAzureService } from 'src/modules/files/files.service';
import { AuthGuard } from '../auth/guard/jwt.guard';
import { AuthorizeGuard } from 'src/auth/guard/authorization.guard';
import { Roles } from 'src/common/user-role.enum';
import e from 'express';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('User')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly fileService: FilesAzureService,
    ) {}

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
    @ApiOperation({
        summary: 'Update user details',
        description:
            'Update user details, only update field have value, delete field dont want to update',
    })
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

    @Post('/upload')
    @UseInterceptors(FileInterceptor('image'))
    async up(@UploadedFile() file: Express.Multer.File) {
        const containerName = 'fileupload';
        const upload = await this.fileService.uploadFile(file, containerName);
        return { upload, message: 'uploaded successfully' };
    }

    @Get('/all')
    @ApiOperation({ summary: 'Get all users (Admin only)' })
    @ApiResponse({
        status: 201,
        description: 'Successfully retrieved all users.',
    })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized. Requires ADMIN role.',
    })
    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard, AuthorizeGuard([Roles.ADMIN]))
    async findAll() {
        return this.userService.findAll();
    }

    @Post('forgot-password')
    async forgotPassword(
        @Query('email') email: string,
    ) {
        return this.userService.forgotPassword(email);
    }
}
