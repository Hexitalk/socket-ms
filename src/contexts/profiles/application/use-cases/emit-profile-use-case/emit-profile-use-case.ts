import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';
import {
  NatsPayloadConfigInterface,
  NatsPayloadInterface,
} from 'src/contexts/shared/nats/interfaces';
import { NatsPayloadConfig } from 'src/contexts/shared/decorators';
import { EmitProfileDto } from './emit-profile.dto';
import { ProfileEmitter } from 'src/contexts/profiles/domain/ports/profile.emitter';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class EmitProfileUseCase {
  constructor(
    private readonly profileRepository: ProfileEmitter,
    @Inject(NATS_SERVICE) private readonly clientNats: ClientProxy,
  ) {}

  async run(
    dto: EmitProfileDto,
    @NatsPayloadConfig() config?: NatsPayloadConfigInterface,
  ): Promise<void> {
    const { profile } = dto;
    const { authUserId } = config;

    let rooms = [authUserId];

    const payloadHubChatsUserIds: NatsPayloadInterface<never> = {
      ...config,
    };

    try {
      const hubResponse: { userIds: string[] } = await firstValueFrom(
        this.clientNats.send(
          { cmd: 'hub.get-hub-chats-user-ids' },
          payloadHubChatsUserIds,
        ),
        { defaultValue: { userIds: [] } },
      );

      rooms = rooms.concat(hubResponse.userIds);
    } catch (error) {
      console.log('CATCH', error);
    }

    if (rooms.length) {
      this.profileRepository.emitProfile(rooms, profile);
    }
  }
}
