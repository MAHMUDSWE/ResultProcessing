import { CacheModuleOptions } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

export const getRedisConfig = (
    configService: ConfigService,
): CacheModuleOptions => ({
    store: redisStore as any, // Cast because types for redisStore may not align
    host: configService.get<string>('REDIS_HOST', 'localhost'),
    port: configService.get<number>('REDIS_PORT', 6379),
    password: configService.get<string>('REDIS_PASSWORD', undefined),
    ttl: configService.get<number>('REDIS_TTL', 300), // Default 5 min TTL
    isGlobal: true,
});
