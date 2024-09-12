import { Module } from '@nestjs/common';
import { ProfilesModule } from './contexts/profiles/infraestructure/profiles.module';

@Module({
  imports: [ProfilesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
