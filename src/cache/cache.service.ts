import { Inject, Injectable } from '@nestjs/common'
import { RedisService } from '@liaoliaots/nestjs-redis'

@Injectable()
export class CacheService {
    private redisIsConnected = false
    public client

    public constructor(
        @Inject(RedisService) private readonly redisService: RedisService,
    ) {
        this.client = this.redisService.getClient()

        this.client.on('connect', () => {
            this.redisIsConnected = true
        })

        this.client.on('reconnecting', () => {
            this.redisIsConnected = false
        })

        this.client.on('error', () => {
            this.redisIsConnected = false
        })
    }

    public async set(key: string, value: unknown, { ttl }: { ttl: number }) {
        if (!this.redisIsConnected) {
            return null
        }

        await this.client.set(key, value, 'EX', ttl)
    }

    public async get(key: string) {
        if (!this.redisIsConnected) {
            return null
        }

        const data: string = await this.client.get(key)

        if (!data) {
            return null
        }

        return data
    }

    public async del(key: string): Promise<unknown> {
        if (!this.redisIsConnected) {
            return null
        }

        return await this.client.del(key)
    }

    public async delMultiple(keys: Array<string>): Promise<unknown> {
        if (!this.redisIsConnected) {
            return null
        }

        await Promise.all(
            keys.map(async (key: string) => await this.client.del(key)),
        )
        return 1
    }
}