import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { envs } from './config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const logger = new Logger('SOCKET-MICROSERVICE');

  // Crear la aplicación HTTP para los websockets
  const httpApp = await NestFactory.create(AppModule);
  httpApp.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  httpApp.useWebSocketAdapter(new IoAdapter(httpApp));

  await httpApp.listen(envs.port);
  logger.log(`HTTP app with WebSockets running on port ${envs.port}`);

  // Crear el microservicio para NATS
  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.NATS,
      options: {
        servers: envs.natsServers,
      },
    });

  await microservice.listen();
  logger.log(`Microservice for NATS running`);
}

bootstrap();

// import { Logger, ValidationPipe } from '@nestjs/common';
// import { NestFactory } from '@nestjs/core';
// import { envs } from './config';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';
// import { AppModule } from './app.module';
// import { IoAdapter } from '@nestjs/platform-socket.io';

// async function bootstrap() {
//   const logger = new Logger('SOCKET-MICROSERVICE');

//   const app = await NestFactory.createMicroservice<MicroserviceOptions>(
//     AppModule,
//     {
//       transport: Transport.NATS,
//       options: {
//         servers: envs.natsServers,
//       },
//     },
//   );

//   app.useGlobalPipes(
//     new ValidationPipe({
//       whitelist: true,
//       forbidNonWhitelisted: true,
//     }),
//   );

//   app.useWebSocketAdapter(new IoAdapter(app));

//   await app.listen();
//   logger.log(`Sockets Microservice running on port ${envs.port}!`);
// }
// bootstrap();
