import { Global, Module } from "@nestjs/common";
import { FilesAzureService } from "./files.service";
@Global()
@Module(
    {
        providers: [FilesAzureService],
        exports: [FilesAzureService]
    }
)
export class FilesModule { }