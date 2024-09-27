import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RpcAuthGuard } from 'src/contexts/shared/guards/rpc-auth.guard';
import { NatsPayloadInterface } from 'src/contexts/shared/nats/interfaces';
import { HubPropagateEmitControllerDto } from './hub-propagate-emit-controller.dto';
import { HubPropagateEmitUseCase } from 'src/contexts/hub/application/use-cases';

@Controller('sockets')
export class HubPropagateEmitController {
  constructor(
    private readonly hubPropagateEmitUseCase: HubPropagateEmitUseCase,
  ) {}

  @UseGuards(RpcAuthGuard)
  @MessagePattern({ cmd: 'socket.hub-propagate-emit' })
  run(@Payload() payload: NatsPayloadInterface<HubPropagateEmitControllerDto>) {
    const { data: userIdDto, ...config } = payload;
    return this.hubPropagateEmitUseCase.run(userIdDto, config);
  }
}
