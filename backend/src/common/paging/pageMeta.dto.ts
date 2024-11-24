import { ApiProperty } from '@nestjs/swagger';
import { PageOptionDto } from './pageOption.dto';
import { Max, Min } from 'class-validator';

export class PageMetaDto {
    @ApiProperty({
        description: 'page numer',
        default: 1,
        minimum: 1,
        type: Number,
    })
    page: number;

    @Max(50)
    @Min(1)
    @ApiProperty({
        description: 'number of items take per page',
        default: 10,
        minimum: 1,
        type: Number,
    })
    take: number;

    @ApiProperty({ description: 'total items', type: Number })
    totalItems: number;

    @ApiProperty({ description: 'total pages', type: Number })
    totalPages: number;

    @ApiProperty({ description: 'has next page', type: Boolean })
    next: boolean;

    @ApiProperty({ description: 'has previous page', type: Boolean })
    previous: boolean;

    constructor(totalItems: number, pageOption: PageOptionDto) {
        this.page = pageOption.page;
        this.take = pageOption.take;
        this.totalItems = totalItems;
        this.totalPages = Math.ceil(totalItems / this.take);
        this.next = this.page < this.totalPages;
        this.previous = this.page > 1;
    }
}
