import { ProfileInterface } from '../interfaces/profile.interface';

export abstract class ProfileEmitter {
  abstract emitProfile(
    rooms: string[],
    profile: ProfileInterface,
  ): Promise<void>;
}
