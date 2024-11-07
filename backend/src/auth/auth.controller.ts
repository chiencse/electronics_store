import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { verifyDto } from './dto/veryfyDto';
import { ApiProperty } from '@nestjs/swagger';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth() {}

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req, @Res() res) {
        return res.json(this.authService.googleLogin(req));
    }

    @Post('veryfy-code')
    @ApiProperty({ type: verifyDto, description: 'Verify code' })
    async verifyCode(
        @Body() veryfyDto : verifyDto
    ) {
        console.log(veryfyDto);
        return this.authService.verifyCode(veryfyDto.code, veryfyDto.email);
    }
}
