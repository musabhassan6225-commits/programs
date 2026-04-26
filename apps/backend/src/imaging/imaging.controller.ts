import { Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ImagingService } from './imaging.service';
import { ImagingAsset } from './image.entity';
import { UploadImagingDto } from './dto/upload-imaging.dto';

@Controller('imaging')
export class ImagingController {
  constructor(private readonly imagingService: ImagingService) {}

  @Get()
  async all(@Query('patientId') patientId?: string): Promise<ImagingAsset[]> {
    return this.imagingService.findAll(patientId);
  }

  @Post()
  async upload(@Body() payload: Partial<ImagingAsset>): Promise<ImagingAsset> {
    return this.imagingService.create(payload);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, callback) => {
          const fileExtName = extname(file.originalname);
          const fileName = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
          callback(null, `${fileName}${fileExtName}`);
        },
      }),
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: UploadImagingDto): Promise<ImagingAsset> {
    const url = `/uploads/${file.filename}`;
    return this.imagingService.create({
      patientId: body.patientId,
      type: body.type,
      url,
      fileName: file.filename,
      metadata: { description: body.description, originalName: file.originalname },
      uploadedAt: new Date().toISOString(),
    });
  }
}
