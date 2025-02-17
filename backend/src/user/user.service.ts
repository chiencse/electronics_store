import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthPayload, User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signIn.dto';
import { RedisService } from 'src/modules/redis/redis.service';
import { MailService } from 'src/mail/mail.service';
import { FilesAzureService } from 'src/modules/files/files.service';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly dataSource: DataSource,
        private readonly redisService: RedisService,
        private readonly mailService: MailService,
        private readonly fileService: FilesAzureService,
    ) { }

    async createUser(createUserDto: CreateUserDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const find_user = await this.userRepository.findOne({
                where: [
                    { email: createUserDto.email },
                    { username: createUserDto.username },
                ],
            });
            if (find_user) {
                throw new ConflictException('Username or email already exists');
            }

            const salt = await bcrypt.genSaltSync(10);
            const hash = await bcrypt.hashSync(createUserDto.password, salt);
            const newUser = queryRunner.manager.create(User, {
                ...createUserDto,
                salt: salt,
                hash_password: hash,
            });

            await queryRunner.manager.save(newUser);
            await queryRunner.commitTransaction();
            const payload: AuthPayload = { id: newUser.id, email: newUser.email, FName: newUser.Fname, username: newUser.username, role: newUser.roles };
            return {
                message: 'User Sign up successfully',
                token: this.jwtService.sign(payload),

            };
        } catch (error) {
            await queryRunner.rollbackTransaction();
            return {
                message: 'User creation failed',
                error: error.message,
            };
        } finally {
            await queryRunner.release();
        }
    }

    async login(signInDto: SignInDto) {
        const user = await this.userRepository.findOne({
            where: [
                { email: signInDto.email },
                { username: signInDto.username },
            ],
        });
        if (!user) {
            throw new NotFoundException('Invalid email or username');
        }

        const hash_p = await bcrypt.hash(signInDto.password, user.salt);

        if (hash_p !== user.hash_password) {
            throw new NotFoundException('Invalid password');
        }

        const payload: AuthPayload = { id: user.id, email: user.email, FName: user.Fname, username: user.username, role: user.roles };
        return {
            message: 'User logged in successfully',
            token: this.jwtService.sign(payload),
            user,
        };
    }

    async update(updateUserDto: UpdateUserDto, current_user: AuthPayload) {
        const user = await this.userRepository.findOneBy({
            id: current_user.id,
        });
        console.log('User:', user);
        // 2. Throw error if user is not found
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // 3. Update the user entity with fields from updateUserDto
        // Object.assign only updates the fields provided in the DTO (partial update)
        Object.assign(user, updateUserDto);

        try {
            await this.userRepository.save(user);
        } catch (error) {
            throw new BadRequestException('Failed to update user');
        }

        return user;
    }

    async findAll() {
        const users = await this.userRepository.find({
            relations: ['orders'],
        });

        return await users.map((user) => {
            delete user.hash_password;
            delete user.salt;
            return user;
        });
    }

    async findOne(id: string) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async forgotPassword(email: string) {
        const user = await this.userRepository.findOneBy({ email });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        this.mailService.sendMail(user.email, code);
        await this.redisService.set(user.email, code, 300);
        return code;
    }

    async changePassword(newPassword: string, OldPassword: string, current_user: AuthPayload) {
        const user = await this.userRepository.findOneBy({ id: current_user.id });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const hash_p = await bcrypt.hash(OldPassword, user.salt);

        if (hash_p !== user.hash_password) {
            throw new NotFoundException('Invalid password');
        }

        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(newPassword, salt);

        user.salt = salt;
        user.hash_password = hash;

        try {
            await this.userRepository.save(user);
        } catch (error) {
            throw new BadRequestException('Failed to change password');
        }
        return {
            message: 'Password changed successfully',
        }
    }

    async uploadAvatar(userId: string, file: Express.Multer.File): Promise<string> {
        const containerName = 'fileupload';
        try {

            const avatarUrl = await this.fileService.uploadFile(
                file,
                containerName,
            );


            await this.userRepository.update(userId, { avatar: avatarUrl });

            return avatarUrl;
        } catch (error) {
            console.error('Error uploading avatar:', error);
            throw new Error('Failed to upload avatar. Please try again.');
        }
    }

    e
    async getAvatarUrl(userId: string): Promise<string | null> {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            select: ['avatar'],
        });

        return user?.avatar || null;
    }


    async deleteAvatar(userId: string): Promise<void> {
        const containerName = 'fileupload';
        const user = await this.userRepository.findOne({
            where: { id: userId },
            select: ['avatar'],
        });

        if (user?.avatar) {

            const fileName = user.avatar.split('/').pop();

            if (fileName) {

                await this.fileService.deleteFile(fileName, containerName);
            }


            await this.userRepository.update(userId, { avatar: null });
        }
    }
}
