import { ApiProperty } from "@nestjs/swagger";

export class InsertCartDto {

    @ApiProperty({description: 'Time last modified', type: 'string', format: 'date-time' })
    lastModified: Date = new Date();

    @ApiProperty({description: 'User ID', type: 'string' })
    productId: string;
}
