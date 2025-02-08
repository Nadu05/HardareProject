import { Component } from '@angular/core';
import { SensorService } from './sensor.service';
import { sensorData } from './json.model';

@Component({
  selector: 'app-sensor',
  imports: [],
  templateUrl: './sensor.component.html',
  styleUrl: './sensor.component.css'
})
export class SensorComponent {



  constructor(private sensorService: SensorService) { }

  jsonData: sensorData={
    luxValue: 0,
    colourTemp: 0,
    redVal: 0,
    greenVal: 0,
    blueVal: 0
  };

  luxValue: number=0;
  colourTemp: number=0;
  redVal: number=0;
  greenVal: number=0;
  blueVal: number=0;

  sensorData(){
    this.sensorService.getSensorData().subscribe((data: sensorData) => {
      this.jsonData = data;
      this.luxValue = this.jsonData.luxValue;
      this.colourTemp = this.jsonData.colourTemp;
      this.redVal = this.jsonData.redVal;
      this.greenVal = this.jsonData.greenVal;
      this.blueVal = this.jsonData.blueVal;
    });
  }

}
