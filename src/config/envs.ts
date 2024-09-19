import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  NATS_SERVERS: string[];
  SOCKET_CORS_ORIGINS: string[];
  SOCKET_CORS_TRANSPORTS: string[];
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
    SOCKET_CORS_ORIGINS: joi.array().items(joi.string()).required(),
    SOCKET_CORS_TRANSPORTS: joi.array().items(joi.string()),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
  SOCKET_CORS_ORIGINS: process.env.SOCKET_CORS_ORIGINS?.split(','),
  SOCKET_CORS_TRANSPORTS: process.env.SOCKET_CORS_TRANSPORTS?.split(','),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

const webSocketOption: {
  cors: {
    origin: string[];
    transports?: string[];
  };
} = {
  cors: {
    origin: envVars.SOCKET_CORS_ORIGINS,
  },
};

if (envVars.SOCKET_CORS_TRANSPORTS) {
  webSocketOption.cors.transports = envVars.SOCKET_CORS_TRANSPORTS;
}

export const envs = {
  port: envVars.PORT,
  socketOptions: webSocketOption,
  natsServers: envVars.NATS_SERVERS,
};
