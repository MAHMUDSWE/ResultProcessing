import { BullModule } from '@nestjs/bull';
import { CacheModule } from '@nestjs/cache-manager';
import { Logger, Module, OnApplicationShutdown, OnModuleDestroy } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ServeStaticModule } from '@nestjs/serve-static';
import { LoggerModule } from 'nestjs-pino';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { getBullConfig } from './config/bull.config';
import { getDatabaseConfig } from './config/database.config';
import { getLoggerConfig } from './config/logger.config';
import { getRateLimiterConfig } from './config/rateLimiter.config';
import { getRedisConfig } from './config/redis.config';
@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),

    // Rate limiting
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getRateLimiterConfig,
      inject: [ConfigService],
    }),

    // Caching with Redis
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getRedisConfig,
      inject: [ConfigService],
      isGlobal: true,
    }),

    // Bull Queue for background jobs
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getBullConfig,
      inject: [ConfigService],
    }),

    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getLoggerConfig,
      inject: [ConfigService],
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
      serveStaticOptions: {
        setHeaders: (res, path) => {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        },
      },
    }),


    // Feature modules
    AuthModule,
  ],
})

export class AppModule implements OnModuleDestroy, OnApplicationShutdown {
  private readonly logger = new Logger(AppModule.name);

  onModuleDestroy() {
    this.logger.log('⚠️ Module is being destroyed.');
  }

  onApplicationShutdown(signal?: string) {
    this.logger.log(`🛑 Application is shutting down due to signal: ${signal}`);
  }
}