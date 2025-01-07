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
    Query,
    Param,
    HttpException,
    HttpStatus,
    Delete,
    
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
    ApiBearerAuth,
    ApiBody,
    ApiConsumes,
    ApiOkResponse,
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiParam,
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
    @ApiOperation({ summary: 'Upload image' })
    @UseInterceptors(FileInterceptor('image'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Image file to upload',
        schema: {
            type: 'object',
            properties: {
                image: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiOkResponse({
        description: 'Image uploaded successfully',
        schema: {
            type: 'object',
            properties: {
                upload: {
                    type: 'object',
                    description: 'Details of the uploaded file',
                    example: {
                        url: 'https://storage.service/container/file.jpg',
                        fileName: 'file.jpg',
                        size: 1024,
                    },
                },
                message: { type: 'string', example: 'uploaded successfully' },
            },
        },
    })
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

    @Get('/profile')
    @ApiOperation({ summary: 'Get user profile' })
    @ApiResponse({
        status: 200,
        description: 'Successfully retrieved user profile.',
    })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard)
    async findOne(@CurrentUser() crtUser: AuthPayload) {
        return this.userService.findOne(crtUser.id);
    }

    @Post('forgot-password')
    async forgotPassword(@Query('email') email: string) {
        return this.userService.forgotPassword(email);
    }

    @Patch('change-password')
    @ApiOperation({ summary: 'Change Password' })
    @ApiResponse({
        status: 200,
        description: 'Successfully ',
    })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard)
    async changePassword(
        @Body() body: { Newpassword: string, OldPassword:string },
        @CurrentUser() crtUser: AuthPayload) {
            return this.userService.changePassword(body.Newpassword, body.OldPassword, crtUser);

    }
    @Post(':id/avatar')
    @ApiOperation({ summary: 'Upload user avatar' })
    @ApiParam({
        name: 'id',
        description: 'User ID to associate the avatar with',
        type: String,
    })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiResponse({ status: 201, description: 'Avatar uploaded successfully' })
    @ApiResponse({ status: 400, description: 'Invalid file or user ID' })
    @UseInterceptors(FileInterceptor('file'))
    async uploadAvatar(
        @Param('id') userId: string,
        @UploadedFile() file: Express.Multer.File,
    ): Promise<{ avatarUrl: string }> {
        if (!file) {
            throw new HttpException('File not provided', HttpStatus.BAD_REQUEST);
        }

        const avatarUrl = await this.userService.uploadAvatar(userId, file);
        return { avatarUrl };
    }

    @Get(':id/avatar')
    @ApiOperation({ summary: 'Retrieve user avatar URL' })
    @ApiParam({
        name: 'id',
        description: 'User ID to retrieve the avatar for',
        type: String,
    })
    @ApiResponse({
        status: 200,
        description: 'Avatar URL retrieved successfully',
        schema: {
            type: 'object',
            properties: {
                avatarUrl: {
                    type: 'string',
                    description: 'URL of the user avatar',
                    example: 'https://your-storage-account.blob.core.windows.net/fileupload/example-avatar.png',
                },
            },
        },
    })
    @ApiResponse({ status: 404, description: 'User or avatar not found' })
    async getAvatar(@Param('id') userId: string): Promise<{ avatarUrl: string | null }> {
        const avatarUrl = await this.userService.getAvatarUrl(userId);
        if (!avatarUrl) {
            throw new HttpException('Avatar not found', HttpStatus.NOT_FOUND);
        }

        return { avatarUrl };
    }

    @Delete(':id/avatar')
    @ApiOperation({ summary: 'Delete user avatar' })
    @ApiParam({
        name: 'id',
        description: 'User ID to delete the avatar for',
        type: String,
    })
    @ApiResponse({ status: 200, description: 'Avatar deleted successfully' })
    @ApiResponse({ status: 404, description: 'User or avatar not found' })
    async deleteAvatar(@Param('id') userId: string): Promise<{ message: string }> {
        await this.userService.deleteAvatar(userId);
        return { message: 'Avatar deleted successfully' };
    }
}
