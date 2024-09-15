export abstract class AuthRepository {
  abstract emitUserAuthorized(
    room: string,
    isAuthorized: boolean,
  ): Promise<void>;
}
