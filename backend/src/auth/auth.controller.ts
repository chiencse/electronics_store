import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { verifyDto } from './dto/veryfyDto';
import { ApiProperty } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth() {}

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req, @Res() res: Response) {
        const token = await this.authService.googleLogin(req).then((data) => {
            return data.token;
        });
        res.redirect(`http://localhost:3000/api/success?token=${token}`);
    }

    @Post('veryfy-code')
    @ApiProperty({ type: verifyDto, description: 'Verify code' })
    async verifyCode(@Body() veryfyDto: verifyDto) {
        console.log(veryfyDto);
        return this.authService.verifyCode(veryfyDto.code, veryfyDto.email);
    }
}
