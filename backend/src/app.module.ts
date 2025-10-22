import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BitcoinModule } from './bitcoin/bitcoin.module';
import { LightningModule } from './lightning/lightning.module';

@Module({
  imports: [BitcoinModule, LightningModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
