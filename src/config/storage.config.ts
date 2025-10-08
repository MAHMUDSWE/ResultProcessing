import { ConfigService } from '@nestjs/config';
import { diskStorage, memoryStorage } from 'multer';
import { extname } from 'path';

export function getMulterConfigFactory(configService: ConfigService) {
    const driver = configService.get<string>('STORAGE_DRIVER', 'local');
    const uploadDest = configService.get<string>('UPLOAD_DEST', './uploads');
    const fileSize = configService.get<number>('MAX_FILE_SIZE', 5 * 1024 * 1024);

    const isCloud = driver === 'cloud';

    return {
        storage: isCloud
            ? memoryStorage()
            : diskStorage({
                destination: uploadDest,
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    callback(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
                },
            }),
        limits: {
            fileSize,
        },
        fileFilter: (req, file, callback) => {
            if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
                callback(null, true);
            } else {
                callback(new Error('Only image files are allowed!'), false);
            }
        },
    };
}
