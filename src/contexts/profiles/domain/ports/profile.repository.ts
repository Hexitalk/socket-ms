import { ProfileInterface } from '../interfaces/profile.interface';

export abstract class ProfileRepository {
  abstract emitProfile(room: string, profile: ProfileInterface): Promise<void>;
}
