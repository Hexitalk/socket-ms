import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';
import {
  NatsPayloadConfigInterface,
  NatsPayloadInterface,
} from 'src/contexts/shared/nats/interfaces';
import { NatsPayloadConfig } from 'src/contexts/shared/decorators';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { HubPropagateEmitDto } from './hub-propagate-emit-use-case.dto';
import { HubEmitter } from 'src/contexts/hub/domain/ports/hub.emitter';

@Injectable()
export class HubPropagateEmitUseCase {
  constructor(
    private readonly hubEmmiter: HubEmitter,
    @Inject(NATS_SERVICE) private readonly clientNats: ClientProxy,
  ) {}

  async run(
    dto: HubPropagateEmitDto,
    @NatsPayloadConfig() config?: NatsPayloadConfigInterface,
  ): Promise<void> {
    const { userId } = dto;
    // const { authUserId } = config;

    const payloadHubChatsUserIds: NatsPayloadInterface<{ userId: string }> = {
      ...config,
      data: { userId },
    };

    try {
      const hubResponse: { hubs: { user_id: string; hub_chats: any[] }[] } =
        await firstValueFrom(
          this.clientNats.send(
            { cmd: 'hub.get-hubs-propagate' },
            payloadHubChatsUserIds,
          ),
          { defaultValue: { hubs: [] } },
        );

      hubResponse.hubs.forEach((hub) => {
        this.hubEmmiter.emitHub(hub.user_id, { hub_chats: hub.hub_chats });
      });
    } catch (error) {
      console.log('CATCH', error);
    }
  }
}
