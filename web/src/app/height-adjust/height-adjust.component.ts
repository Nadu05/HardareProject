import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeightAdjustService } from './height-adjust.service';
import { Data } from './json.model';
import { SensorComponent } from "../sensor/sensor.component";

@Component({
  selector: 'app-height-adjust',
  imports: [CommonModule, SensorComponent],
  templateUrl: './height-adjust.component.html',
  styleUrl: './height-adjust.component.css'
})
export class HeightAdjustComponent {
  ispluskeypressed = false;
  isminuskeypressed = false; 
  data: Data = {
    state: 'off',
    rotation: 'none',
  }

  constructor(
    private heightAdjustService: HeightAdjustService
  ) { }

  // Combined keydown listener
  @HostListener('document:keydown', ['$event'])
  async handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case '+':
        if (!this.ispluskeypressed) {
          this.data.state = 'on';
          this.data.rotation = 'clockwise';
          this.ispluskeypressed = true;
          await this.sendData(this.data); // Send data to server
          console.log('plus key pressed');
        }
        break;

      case '-':
        if (!this.isminuskeypressed) {
          this.data.state = 'on';
          this.data.rotation = 'counterclockwise';
          this.isminuskeypressed = true;
          await this.sendData(this.data); // Send data to server
          console.log('minus key pressed');
        }
        break;

      // Add more cases 
    }
  }

  // Combined keyup listener
  @HostListener('document:keyup', ['$event'])
  async handleKeyUp(event: KeyboardEvent) {
    switch (event.key) {
      case '+':
        if (this.ispluskeypressed) {
          this.data.state = 'off';
          this.data.rotation = 'none';
          this.ispluskeypressed = false;
          await this.sendData(this.data); // Send data to server
          console.log('plus key released');
        }
        break;

      case '-':
        if (this.isminuskeypressed) {
          this.data.state = 'off';
          this.data.rotation = 'none';
          this.isminuskeypressed = false;
          await this.sendData(this.data); // Send data to server
          console.log('minus key released');
        }
        break;

      // Add more cases
    }
  }

  async sendData(data: Data) {
    (await this.heightAdjustService.sendHeightAdjustData(data)).subscribe(
      (response) => {
        console.log('Response:', response);
      }
    );
  }
}
