import { Body, Controller, Delete, HttpException, HttpStatus, Inject, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, resolve } from 'path';
import { uniqueId } from 'lodash';
import { remove } from 'fs-extra';
import { IsAdmin } from '@core/guards/role-auth.guard';
import * as dayjs from 'dayjs';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Controller('files')
export class FilesController {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, cb) => {
          cb(null, `${dayjs().format('YYYYMMDDHHmmss')}_${uniqueId()}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException(`'file' was required`, HttpStatus.BAD_REQUEST);
    }
    const response = {
      name: file.filename,
      url: `files/${file.filename}`,
      size: file.size,
    };
    return response;
  }

  @IsAdmin()
  @Delete()
  async removeFile(@Body() params: { file: string }) {
    await remove(resolve(process.cwd(), 'files', params.file));
    return 'ok';
  }
}
