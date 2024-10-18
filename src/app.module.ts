import { Module } from '@nestjs/common';
import { ProfilesModule } from './contexts/profiles/infraestructure/profiles.module';
import { AuthModule } from './contexts/auth/infraestructure/auth.module';
import { SocketModule } from './contexts/socket/infraestructure/socket.module';
import { HubModule } from './contexts/hub/infraestructure/hub.module';
import { ChatModule } from './contexts/chat/infraestructure/chat.module';
import { HealthCheckModule } from './contexts/health-check/health-check.module';

@Module({
  imports: [
    SocketModule,
    ProfilesModule,
    AuthModule,
    HubModule,
    ChatModule,
    HealthCheckModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {}
}
