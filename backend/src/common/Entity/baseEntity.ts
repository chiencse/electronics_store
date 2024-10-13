import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({
        type: 'string',
        format: 'uuid',
        description: 'The unique identifier of the entity',
    })
    id: string;

    @Column()
    @CreateDateColumn()
    @ApiProperty({
        type: 'string',
        format: 'date-time',
        description: 'The date and time the entity was created',
    })
    createdAt: Date;

    @Column()
    @CreateDateColumn()
    @ApiProperty({
        type: 'string',
        format: 'date-time',
        description: 'The date and time the entity was last updated',
    })
    updatedAt: Date;
}
