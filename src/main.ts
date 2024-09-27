import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { envs } from './config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const logger = new Logger('SOCKET-MICROSERVICE');

  // Crear la instancia de la aplicación solo una vez
  const app = await NestFactory.create(AppModule);

  // Configurar el adaptador de WebSocket para manejar las conexiones de Socket.IO
  app.useWebSocketAdapter(new IoAdapter(app));

  // Configurar las validaciones globales
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Configurar CORS si es necesario
  app.enableCors({
    origin: '*', // Permitir cualquier origen
    methods: ['GET', 'POST'],
    credentials: true,
  });

  // Iniciar el servidor HTTP en el puerto especificado
  await app.listen(envs.port);
  logger.log(`HTTP Server with Socket.IO running on port ${envs.port}!`);

  // Iniciar el microservicio NATS dentro de la misma instancia
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: envs.natsServers,
    },
  });

  // Escuchar microservicio
  await app.startAllMicroservices();
  logger.log('Microservice (NATS) is up and running!');
}

bootstrap();
// -----------------------------------
// async function bootstrap() {
//   const logger = new Logger('SOCKET-MICROSERVICE');

//   // Crear la aplicación HTTP para los websockets
//   const httpApp = await NestFactory.create(AppModule);
//   httpApp.useGlobalPipes(
//     new ValidationPipe({
//       whitelist: true,
//       forbidNonWhitelisted: true,
//     }),
//   );
//   httpApp.useWebSocketAdapter(new IoAdapter(httpApp));

//   await httpApp.listen(envs.port);
//   logger.log(`HTTP app with WebSockets running on port ${envs.port}`);

//   // Crear el microservicio para NATS
//   const microservice =
//     await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
//       transport: Transport.NATS,
//       options: {
//         servers: envs.natsServers,
//       },
//     });

//   await microservice.listen();
//   logger.log(`Microservice for NATS running`);
// }

// bootstrap();
// ------------------------------
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
