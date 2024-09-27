import { IsNotEmpty } from 'class-validator';

export class HubPropagateEmitControllerDto {
  @IsNotEmpty()
  public userId: string;
}
