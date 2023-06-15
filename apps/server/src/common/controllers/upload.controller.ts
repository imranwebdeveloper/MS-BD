import {
  Controller,
  FileTypeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { UtilsService } from '../providers/utils.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MobileDto } from '../dtos/create-mobile.dto';
import { UploadService } from '../providers/upload.service';
import { Phone, ResType } from 'types';

@Controller('upload')
export class UploadController {
  constructor(
    private utilsService: UtilsService,
    private uploadService: UploadService,
  ) {}

  @Post('mobile')
  @UseInterceptors(FileInterceptor('file'))
  async uploadMobilePhotos(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          //   new MaxFileSizeValidator({ maxSize: 10000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<ResType<{ img_url: string }>> {
    const data = new Date().getTime();
    const photoName = `${data}-${file.originalname}`;
    const img_url = await this.utilsService.uploadPhotos(
      file.buffer,
      photoName,
    );
    return { message: 'success', data: { img_url } };
  }

  @Post('scraping')
  async saveNewMobileInfo(@Body() body: Phone) {
    console.log(body.title);
    const data = await this.uploadService.saveNewMobileInfo(body);
    return data;
  }
}
