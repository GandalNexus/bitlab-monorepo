import { Controller, Get, Post, Body } from '@nestjs/common';
import { LightningService } from './lightning.service';

@Controller('lightning')
export class LightningController {
  constructor(private readonly lightningService: LightningService) {}

  @Get('info')
  getWalletInfo() {
    return this.lightningService.getWalletInfo();
  }

  @Post('invoice')
  createInvoice(@Body('sats') sats: number) {
    return this.lightningService.createInvoice(sats);
  }

  @Get('address')
  getNewAddress() {
    return this.lightningService.getNewAddress();
  }

  @Get('balance')
  getBalance() {
    return this.lightningService.getBalance();
  }

  @Post('pay')
  payInvoice(@Body('invoice') invoice: string) {
    return this.lightningService.payInvoice(invoice);
  }
}
