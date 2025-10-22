import { Module } from '@nestjs/common';
import { LightningService } from './lightning.service';
import { LightningController } from './lightning.controller';

@Module({
  providers: [LightningService],
  controllers: [LightningController]
})
export class LightningModule {}
