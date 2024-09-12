import { IsNotEmpty } from 'class-validator';
import { ProfileInterface } from 'src/contexts/profiles/domain/interfaces/profile.interface';

export class EmitProfileControllerDto {
  @IsNotEmpty()
  public profile: ProfileInterface;
}
