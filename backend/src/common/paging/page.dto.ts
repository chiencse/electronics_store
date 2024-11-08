import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";
import { PageMetaDto } from "./pageMeta.dto";

export class PageDto<T> {
    @ApiProperty({description: "list data", isArray: true})
    @IsArray()
    readonly data: T[];

    @ApiProperty({description: "metadata", type: Number})
    readonly meta : PageMetaDto

    constructor(data: T[], meta: PageMetaDto) {
        this.data = data;
        this.meta = meta;
    }
}