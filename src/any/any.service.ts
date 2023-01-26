import { Injectable } from '@nestjs/common';

@Injectable()
export class AnyService {
  async latency(start: number) {
    await fetch('https://www.google.com', {
      method: 'GET',
    });
    return { time: `${(Date.now() - start) / 1000} s` };
  }
}
