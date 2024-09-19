import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';
import { NatsPayloadConfigInterface } from 'src/contexts/shared/nats/interfaces';
import { NatsPayloadConfig } from 'src/contexts/shared/decorators';
import { EmitProfileDto } from './emit-profile.dto';
import { ProfileEmitter } from 'src/contexts/profiles/domain/ports/profile.emitter';

@Injectable()
export class EmitProfileUseCase {
  constructor(private readonly profileRepository: ProfileEmitter) {}

  async run(
    dto: EmitProfileDto,
    @NatsPayloadConfig() config?: NatsPayloadConfigInterface,
  ): Promise<void> {
    const { profile } = dto;
    const { authUserId } = config;

    console.log({ authUserId });

    if (authUserId) {
      this.profileRepository.emitProfile([authUserId], profile);
    }
  }
}
