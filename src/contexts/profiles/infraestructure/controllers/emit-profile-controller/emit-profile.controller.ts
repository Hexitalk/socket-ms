import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RpcAuthGuard } from 'src/contexts/shared/guards/rpc-auth.guard';
import { NatsPayloadInterface } from 'src/contexts/shared/nats/interfaces';
import { EmitProfileControllerDto } from './emit-profile-controller.dto';
import { EmitProfileUseCase } from 'src/contexts/profiles/application/use-cases/emit-profile-use-case/emit-profile-use-case';

@Controller('sockets')
export class EmitProfileController {
  constructor(private readonly emitProfileUseCase: EmitProfileUseCase) {}

  @UseGuards(RpcAuthGuard)
  @MessagePattern({ cmd: 'sockets.create-socket' })
  run(@Payload() payload: NatsPayloadInterface<EmitProfileControllerDto>) {
    const { data: profileDto, ...config } = payload;
    return this.emitProfileUseCase.run(profileDto, config);
  }
}
