import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RpcAuthGuard } from 'src/contexts/shared/guards/rpc-auth.guard';
import { NatsPayloadInterface } from 'src/contexts/shared/nats/interfaces';
import { EmitProfileUseCase } from 'src/contexts/profiles/application/use-cases/emit-profile-use-case/emit-profile-use-case';
import { ProfileChangeEmitControllerDto } from './profile-change-emit-controller.dto';

@Controller('sockets')
export class ProfileChangeEmitController {
  constructor(private readonly emitProfileUseCase: EmitProfileUseCase) {}

  @UseGuards(RpcAuthGuard)
  @MessagePattern({ cmd: 'socket.profile-change-emit' })
  run(
    @Payload() payload: NatsPayloadInterface<ProfileChangeEmitControllerDto>,
  ) {
    const { data: profileDto, ...config } = payload;
    return this.emitProfileUseCase.run(profileDto, config);
  }
}
