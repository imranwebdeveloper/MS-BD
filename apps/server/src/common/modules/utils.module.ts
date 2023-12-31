import { Module } from '@nestjs/common';
import { UtilsService } from '../providers/utils.service';

@Module({
  providers: [UtilsService],
  exports: [UtilsService],
})
export class UtilsModule {}
