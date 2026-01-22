import { Injectable } from '@nestjs/common';

@Injectable()
export class GatewayService {
  getHello(): object {
    return {
      status: 'ok',
      service: 'Gateway Service',
      now: new Date().toISOString(),
    };
  }
}
