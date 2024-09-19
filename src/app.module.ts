import { Module } from '@nestjs/common';
import { ProfilesModule } from './contexts/profiles/infraestructure/profiles.module';
import { AuthModule } from './contexts/auth/infraestructure/auth.module';
import { SocketModule } from './contexts/socket/infraestructure/socket.module';

@Module({
  imports: [SocketModule, ProfilesModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
