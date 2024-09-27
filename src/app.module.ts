import { Module } from '@nestjs/common';
import { ProfilesModule } from './contexts/profiles/infraestructure/profiles.module';
import { AuthModule } from './contexts/auth/infraestructure/auth.module';
import { SocketModule } from './contexts/socket/infraestructure/socket.module';
import { HubModule } from './contexts/hub/infraestructure/hub.module';

@Module({
  imports: [SocketModule, ProfilesModule, AuthModule, HubModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {}
}
