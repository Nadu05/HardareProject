import { Body, Controller, Post } from '@nestjs/common';
import { SerialService } from 'src/serial/serial.service';


@Controller('height-adjust')
export class HeightAdjustController {

    constructor(private serialService: SerialService) { }
    //url:/height-adjust/adjust
    //
    @Post('adjust')
    async getData(@Body() data: any) {
        //data should send type string you have to break json object
        this.serialService.write('c');
        console.log(data)
        return 'Data written to serial port';
    }


    @Post('stop')
    async down(@Body() data: any) {
        //data should send type string you have to break json object
        this.serialService.write('a');
        console.log(data)
        return 'Data written to serial port';
    }



}
