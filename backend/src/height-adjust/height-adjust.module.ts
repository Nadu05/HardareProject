import { Controller, Module } from '@nestjs/common';
import { HeightAdjustController } from './height-adjust.controller';
import { HeightAdjustService } from './height-adjust.service';
import { SerialModule } from 'src/serial/serial.module';


@Module({
  controllers: [HeightAdjustController],
  providers: [HeightAdjustService,],
  exports: [HeightAdjustService],
  imports: [SerialModule]
})

export class HeightAdjustModule {
}
