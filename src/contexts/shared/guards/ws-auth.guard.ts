import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor() {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const client = context.switchToWs().getClient();
    const data = context.switchToWs().getData();

    // Aquí puedes extraer la autenticación desde los headers o el payload del evento
    const authUserId = client.handshake?.headers?.authUserId || data.authUserId;

    if (!authUserId) {
      throw new UnauthorizedException('user.error.unauthorized');
    }

    return true;
  }
}
