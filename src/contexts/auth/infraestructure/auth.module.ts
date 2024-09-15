import { Module } from '@nestjs/common';
import { NatsModule } from 'src/contexts/shared/nats/nats.module';

import * as path from 'path';
import * as useCases from '../application/use-cases/index';
// import * as controllers from './controllers/';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RpcExceptionInterceptor } from '../../shared/interceptors/rpc-exception-translate.interceptor';
import { I18nJsonLoader, I18nModule } from 'nestjs-i18n';
import { NatsLanguageResolver } from '../../shared/i18n-resolvers/nats-language.resolver';
import { AuthSocketGatewayRepository } from './repositories/auth-socket-gateway.repository';
import { AuthRepository } from '../domain/ports/auth.repository';
import { LoginSocketGatewayController } from './controllers/login-socket-gateway.controller/login-socket-gateway.controller';

@Module({
  imports: [
    NatsModule,
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        loader: I18nJsonLoader,
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [{ use: NatsLanguageResolver, options: {} }],
    }),
  ],
  // controllers: [...Object.values(controllers)],
  providers: [
    ...Object.values(useCases),
    AuthSocketGatewayRepository,
    {
      provide: AuthRepository,
      useExisting: AuthSocketGatewayRepository,
    },
    NatsLanguageResolver,
    {
      provide: APP_INTERCEPTOR,
      useClass: RpcExceptionInterceptor,
    },
    LoginSocketGatewayController,
  ],
  exports: [
    ...Object.values(useCases),
    AuthSocketGatewayRepository,
    {
      provide: AuthRepository,
      useExisting: AuthSocketGatewayRepository,
    },
    LoginSocketGatewayController,
  ],
})
export class AuthModule {}
