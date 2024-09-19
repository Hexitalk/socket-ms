import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';
import {
  NatsPayloadConfigInterface,
  NatsPayloadInterface,
} from 'src/contexts/shared/nats/interfaces';
import { NatsPayloadConfig } from 'src/contexts/shared/decorators';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { AuthRepository } from 'src/contexts/auth/domain/ports/auth.repository';
import { LogoutSocketDto } from './logout-socket-use-case.dto';

@Injectable()
export class LogoutSocketUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    @Inject(NATS_SERVICE) private readonly clientNats: ClientProxy,
  ) {}

  async run(
    dto: LogoutSocketDto,
    @NatsPayloadConfig() config?: NatsPayloadConfigInterface,
  ): Promise<void> {
    const { socketId } = dto;

    if (socketId) {
      const payloadLogoutAuthSocket: NatsPayloadInterface<{
        socketId: string;
      }> = {
        ...config,
        data: { socketId },
      };

      try {
        await firstValueFrom(
          this.clientNats.send(
            { cmd: 'auth.clear-user-socket' },
            payloadLogoutAuthSocket,
          ),
          { defaultValue: void 0 },
        );
      } catch (error) {
        console.log('CATCH', error);
      }
    }
  }
}
