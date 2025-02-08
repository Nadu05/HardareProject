import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { SerialPort } from 'serialport';

@Injectable()
export class SerialService implements OnModuleInit, OnModuleDestroy {
  private port: SerialPort;
  private isInitialized = false;
  private readonly maxRetries = 3;
  private readonly retryDelay = 2000;

  async onModuleInit() {
    console.log('SerialService initializing...');
    if (!this.isInitialized) {
      await this.initializePortWithRetry();
    }
  }

  async onModuleDestroy() {
    await this.closePort();
  }

  private async initializePortWithRetry(attempt = 1) {
    try {
      // Clean up existing port
      await this.closePort();

      console.log(`Attempting to initialize port (attempt ${attempt}/${this.maxRetries})`);
      this.port = new SerialPort({
        path: 'COM3',
        baudRate: 9600,
        autoOpen: false
      });

      await new Promise<void>((resolve, reject) => {
        this.port.open((err) => {
          if (err) {
            console.log(`Port open error:`, err);
            reject(err);
            return;
          }
          console.log('Port opened successfully');
          this.isInitialized = true;
          resolve();
        });
      });

      this.port.on('error', (err) => {
        console.error('Serial port error:', err);
        this.isInitialized = false;
      });

      this.port.on('close', () => {
        console.log('Port closed');
        this.isInitialized = false;
      });

    } catch (error) {
      console.log(`Port initialization attempt ${attempt} failed:`, error);
      
      if (attempt < this.maxRetries) {
        console.log(`Retrying in ${this.retryDelay / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
        return this.initializePortWithRetry(attempt + 1);
      }
      
      throw new Error('Failed to initialize port after maximum retries');
    }
  }

  async closePort() {
    if (this.port) {
      if (this.port.isOpen) {
        await new Promise<void>((resolve) => {
          this.port.close(() => {
            console.log('Port closed successfully');
            this.isInitialized = false;
            resolve();
          });
        });
      }
      this.port = null;
    }
  }

  isPortOpen(): boolean {
    return this.isInitialized && this.port?.isOpen || false;
  }

    async write(data: string): Promise<void> {
        if (!this.isPortOpen()) {
        throw new Error('Serial port is not open');
        }
    
        return new Promise<void>((resolve, reject) => {
        this.port.write(data, (err) => {
            if (err) {
            console.error('Error writing to port:', err);
            reject(err);
            return;
            }
            console.log(`Data written to port: ${data}`);
            resolve();
        });
        });
    }
}