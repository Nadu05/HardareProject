import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SerialModule } from './serial/serial.module';
import { HeightAdjustModule } from './height-adjust/height-adjust.module';
import { SensorController } from './sensor/sensor.controller';
import { SensorModule } from './sensor/sensor.module';

@Module({
  imports: [SerialModule, HeightAdjustModule, SensorModule],
  controllers: [AppController, SensorController],
  providers: [AppService],
})
export class AppModule {}