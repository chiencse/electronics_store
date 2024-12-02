import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';

export class CreateSupplierProductDto {
    @IsOptional()
    @IsString({ message: 'Id must be a string' })
    id?: string;

    @IsString({ message: 'Name must be a string' })
    name: string;

    @IsString({ message: 'Address must be a string' })
    address: string;

    @IsEmail({}, { message: 'Email must be a valid email address' })
    email: string;

    @Matches(/^\d{10,11}$/, {
        message: 'Phone number must be 10-11 digits and contain only numbers',
    })
    phone: string;
}
