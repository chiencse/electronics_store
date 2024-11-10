import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { Global, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { uuid } from 'uuidv4';

@Injectable()
export class FilesAzureService {
    constructor(private readonly configService: ConfigService) {}
    private containerName: string;

    private async getBlobServiceInstance() {
        const connectionString = this.configService.get(
            'AZURE_CONTAINER_CONECTION_STRING',
        );
        const blobClientService =
            await BlobServiceClient.fromConnectionString(connectionString);
        return blobClientService;
    }

    private async getBlobClient(imageName: string): Promise<BlockBlobClient> {
        const blobService = await this.getBlobServiceInstance();
        const containerName = this.containerName;
        const containerClient = blobService.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(imageName);
        return blockBlobClient;
    }

    public async uploadFile(file: Express.Multer.File, containerName: string) {
        this.containerName = containerName;
        const extension = file.originalname.split('.').pop();
        const file_name = uuid() + '.' + extension;
        console.log(file_name);
        const blockBlobClient = await this.getBlobClient(file_name);
        const fileUrl = blockBlobClient.url;
        await blockBlobClient.uploadData(file.buffer);
        return fileUrl;
    }

    async deleteFile(file_name: string, containerName: string) {
        try {
            this.containerName = containerName;
            const blockBlobClient = await this.getBlobClient(file_name);
            await blockBlobClient.deleteIfExists();
        } catch (error) {
            console.log(error);
        }
    }
}
