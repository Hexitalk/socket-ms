import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';
import { NatsPayloadConfigInterface } from 'src/contexts/shared/nats/interfaces';
import { NatsPayloadConfig } from 'src/contexts/shared/decorators';
import { EmitProfiletDto } from './emit-profile.dto';
import { ProfileRepository } from 'src/contexts/profiles/domain/ports/profile.repository';

@Injectable()
export class EmitProfileUseCase {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async run(
    dto: EmitProfiletDto,
    @NatsPayloadConfig() config?: NatsPayloadConfigInterface,
  ): Promise<void> {
    const { profile } = dto;
    const { authUserId } = config;

    if (authUserId) {
      this.profileRepository.emitProfile(authUserId, profile);
    }
  }
}
