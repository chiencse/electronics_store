import { Injectable } from "@nestjs/common";
import { createClient } from "redis";

@Injectable()
export class RedisService {
    private client: any;
    constructor() {
        this.client = createClient({
            url: `rediss://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`, 
            password: process.env.REDIS_PASSWORD,
        })

        this.client.on('connect', () => {
            console.log('Redis connected');
        })
        this.client.connect();
    }

    async set(key: string, value: string, ttl: number) {
        await this.client.set(key, value, {
          EX: ttl, // TTL tính bằng giây
        });
        console.log('Set key:', key, 'value:', value, 'ttl:', ttl);
      }
    
      // Lấy mã xác thực
      async get(key: string): Promise<string | null> {
        return await this.client.get(key);
      }
    
      // Xóa mã xác thực
      async del(key: string) {
        await this.client.del(key);
      }
}