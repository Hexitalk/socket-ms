import { GenderEnum } from '../enums';

export interface ProfileInterface {
  id: string;
  user_id: string;
  nick: string;
  image: string;
  date_birth: string;
  gender: GenderEnum;
  province_id: string;
  country_id: string;
}
