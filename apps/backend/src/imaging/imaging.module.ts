import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagingController } from './imaging.controller';
import { ImagingService } from './imaging.service';
import { ImagingAsset } from './image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImagingAsset])],
  controllers: [ImagingController],
  providers: [ImagingService],
  exports: [ImagingService],
})
export class ImagingModule {}
