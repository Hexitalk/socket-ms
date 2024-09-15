import { Module } from '@nestjs/common';
import { ProfilesModule } from './contexts/profiles/infraestructure/profiles.module';
import { AuthModule } from './contexts/auth/infraestructure/auth.module';
import { WebsocketGateway } from './web-socket.gateway';

@Module({
  imports: [ProfilesModule, AuthModule],
  controllers: [],
  providers: [WebsocketGateway],
})
export class AppModule {}
