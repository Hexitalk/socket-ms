import { HubInterface } from '../interfaces';

export abstract class HubEmitter {
  abstract emitHub(room: string, hub: HubInterface): Promise<void>;
}
