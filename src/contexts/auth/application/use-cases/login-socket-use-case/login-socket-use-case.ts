import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';
import {
  NatsPayloadConfigInterface,
  NatsPayloadInterface,
} from 'src/contexts/shared/nats/interfaces';
import { NatsPayloadConfig } from 'src/contexts/shared/decorators';
import { firstValueFrom } from 'rxjs';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { Socket } from 'socket.io';
import { AuthRepository } from 'src/contexts/auth/domain/ports/auth.repository';

@Injectable()
export class LoginSocketUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    @Inject(NATS_SERVICE) private readonly clientNats: ClientProxy,
  ) {}

  async run(
    token: string,
    client: Socket,
    @NatsPayloadConfig() config?: NatsPayloadConfigInterface,
  ): Promise<void> {
    if (token) {
      const payloadVerifyToken: NatsPayloadInterface<{
        token: string;
        socketId: string;
      }> = {
        ...config,
        data: { token, socketId: client.id },
      };

      try {
        const verifyTokenResponse: { user?: { id: string } } =
          await firstValueFrom(
            this.clientNats.send(
              { cmd: 'auth.verify-token-and-update-socket' },
              payloadVerifyToken,
            ),
          );

        if (!verifyTokenResponse) {
          throw new RpcException({
            status: 400,
            message: 'Fail verify token',
          });
        }
        const { user: userResponse } = verifyTokenResponse;
        if (userResponse.id) {
          client.join(userResponse.id);
          console.log('join socket room:', userResponse.id);
        }
      } catch (error) {
        console.log('CATCH', error);
      }

      // this.profileRepository.emitProfile(authUserId, profile);
    }
  }
}
