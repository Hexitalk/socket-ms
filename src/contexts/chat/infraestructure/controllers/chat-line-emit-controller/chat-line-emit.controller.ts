import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChatLineEmitUseCase } from 'src/contexts/chat/application/use-cases';
import { RpcAuthGuard } from 'src/contexts/shared/guards/rpc-auth.guard';
import { NatsPayloadInterface } from 'src/contexts/shared/nats/interfaces';
import { ChatLineEmitControllerDto } from './chat-line-emit-controller.dto';

@Controller('sockets')
export class HubPropagateEmitController {
  constructor(private readonly chatLineEmitUseCase: ChatLineEmitUseCase) {}

  @UseGuards(RpcAuthGuard)
  @MessagePattern({ cmd: 'socket.chat-line-emit' })
  run(@Payload() payload: NatsPayloadInterface<ChatLineEmitControllerDto>) {
    const { data, ...config } = payload;
    const { chatLine, profilesIds } = data;
    return this.chatLineEmitUseCase.run({ chatLine, profilesIds }, config);
  }
}
