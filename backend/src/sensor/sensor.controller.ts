import { Controller, Get } from '@nestjs/common';

@Controller('sensor')
export class SensorController {


    @Get('data')
    async getData() {     
        return {
            luxValue: Math.random() * 1000,
            colourTemp: Math.random() * 1000,
            redVal: Math.random() * 1000,
            greenVal: Math.random() * 1000,
            blueVal: Math.random() * 1000
          };
    }
}
