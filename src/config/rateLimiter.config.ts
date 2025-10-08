import { ConfigService } from '@nestjs/config';
import { ThrottlerModuleOptions } from '@nestjs/throttler';

export const getRateLimiterConfig = (
    configService: ConfigService,
): ThrottlerModuleOptions => ({
    throttlers: [
        {
            ttl: configService.get<number>('THROTTLE_TTL', 60), // Time to live in seconds
            limit: configService.get<number>('THROTTLE_LIMIT', 100), // Max requests per ttl
        },
    ],
});
