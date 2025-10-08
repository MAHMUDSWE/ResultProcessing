import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';

const IS_PROD = process.env.NODE_ENV === 'production';
const REQUEST_ID_HEADER = 'x-request-id';

export const getLoggerConfig = (
    configService: ConfigService,
) => ({
    pinoHttp: {
        level: IS_PROD ? 'info' : 'debug',
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
                levelFirst: true,
                translateTime: 'UTC:yyyy-mm-dd HH:MM:ss.l o',
            },
        },
        genReqId: (req) => {
            const requestIdHeader = req.headers[REQUEST_ID_HEADER];
            return requestIdHeader ? requestIdHeader.toString() : uuid();
        },
        serializers: {
            req: (req) => ({
                id: req.id,
                method: req.method,
                url: req.url,
            }),
            res: (res) => ({
                statusCode: res.statusCode,
            }),
        },
    },
});
