import { ProfileInterface } from 'src/contexts/profiles/domain/interfaces/profile.interface';

export abstract class MainEmitter {
  abstract emitProfileConnectionStatus(
    room: string,
    profile: ProfileInterface,
    status: string,
  ): Promise<void>;
}
