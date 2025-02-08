import { Controller, Post } from '@nestjs/common';
import { SerialService } from './serial.service';


@Controller('serial')
export class SerialController {

    constructor(private serialService: SerialService) { }


    //url path= /serial/open
    @Post('open')
    async open() {

        return 'Serial port opened';

    }

    @Post('write')
    async write() {
        this.serialService.write('0');
        return 'Data written to serial port';
    }

}