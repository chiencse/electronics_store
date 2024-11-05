import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/common/Entity/baseEntity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
    @Column()
    @ApiProperty({ type: 'string', description: 'The Fname of the user' })
    Fname: string;

    @Column()
    @ApiProperty({ type: 'string', description: 'The LName of the user' })
    LName: string;

    @Column()
    @ApiProperty({ type: 'string', description: 'The email of the user' })
    email: string;

    @Column()
    @ApiProperty({ type: 'string', description: 'The username of the user' })
    @Exclude()
    username: string;

    @Column()
    @Exclude()
    hash_password: string;

    @Column()
    @Exclude()
    salt: string;

    @Column()
    @ApiProperty({ description: 'The phone_number of the user' })
    phone_number: string;

    @Column()
    @ApiProperty({ type: 'string', description: 'The address of the user' })
    address: string;
}

export interface AuthPayload {
    id: string;
    email: string;
}
