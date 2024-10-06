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
import { ChatLineEmitDto } from './chat-line-emit-use-case.dto';
import { ChatEmitter } from 'src/contexts/chat/domain/ports/chat.emitter';

@Injectable()
export class ChatLineEmitUseCase {
  constructor(
    private readonly chatEmmiter: ChatEmitter,
    @Inject(NATS_SERVICE) private readonly clientNats: ClientProxy,
  ) {}

  async run(
    dto: ChatLineEmitDto,
    @NatsPayloadConfig() config?: NatsPayloadConfigInterface,
  ): Promise<void> {
    const { profilesIds, chatLine } = dto;
    const { chat_id: chatId } = chatLine;
    // const { authUserId } = config;

    const payloadGetUsersIds: NatsPayloadInterface<{ profilesIds: string[] }> =
      {
        ...config,
        data: { profilesIds },
      };

    try {
      const usersIdsResponse: {
        usersIds: {
          user_id: string;
          profile_id: string;
        }[];
      } = await firstValueFrom(
        this.clientNats.send(
          { cmd: 'profiles.find-profiles-user-ids' },
          payloadGetUsersIds,
        ),
        { defaultValue: { usersIds: [] } },
      );

      const usersIds: string[] = usersIdsResponse.usersIds.map(
        (userItem) => userItem.user_id,
      );

      this.chatEmmiter.emitChatLine(usersIds, chatLine);
    } catch (error) {
      console.log('CATCH', error);
    }
  }
}
