import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { AnyController } from './any.controller';
import { AnyService } from './any.service';

@Module({
  imports: [AuthModule],
  controllers: [AnyController],
  providers: [AnyService, AuthService],
})
export class AnyModule {}
