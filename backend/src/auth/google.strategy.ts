import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: ['profile', 'email']
        }); 
    }

    async validate(accessToken: string, refreshToken: string, profile : Profile, done: VerifyCallback) : Promise<any> {
        const { name, emails } = profile;
        console.log(name)
        const user = {
            email: emails[0].value,
            FName: name.givenName,
            LName: name.familyName,
            accessToken
        };
        done(null, user);
    }
}