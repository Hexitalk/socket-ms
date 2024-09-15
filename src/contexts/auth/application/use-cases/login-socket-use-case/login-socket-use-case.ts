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
    jwtToken: string,
    client: Socket,
    @NatsPayloadConfig() config?: NatsPayloadConfigInterface,
  ): Promise<void> {
    if (jwtToken) {
      const payloadVerifyToken: NatsPayloadInterface<string> = {
        ...config,
        data: jwtToken,
      };

      const verifyTokenResponse = await firstValueFrom(
        this.clientNats.send({ cmd: 'auth.verify-token' }, payloadVerifyToken),
      );

      if (!verifyTokenResponse) {
        throw new RpcException({
          status: 400,
          message: 'Fail verify token',
        });
      }

      console.log({ verifyTokenResponse });

      // client.join('1');
      // this.profileRepository.emitProfile(authUserId, profile);
    }
  }
}
