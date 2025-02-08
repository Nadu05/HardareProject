import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors();

  // Handle shutdown gracefully
  app.enableShutdownHooks();

  // Get the port with a default value
  const port = process.env.PORT || 3000;

  await app.listen(port);
  console.log(`Application is running on port ${port}`);
}

// Handle process termination
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Closing application...');
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received. Closing application...');
  process.exit(0);
});

bootstrap().catch(err => {
  console.error('Failed to start application:', err);
  process.exit(1);
});