import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BitcoinService } from './bitcoin.service';

@Controller('bitcoin')
export class BitcoinController {
  constructor(private readonly bitcoinService: BitcoinService) {}

  @Get('blockchain-info')
  getBlockchainInfo() {
    return this.bitcoinService.getBlockchainInfo();
  }

  @Post('wallet')
  createWallet(@Body('walletName') walletName: string) {
    return this.bitcoinService.createWallet(walletName);
  }

  @Get('address/:walletName')
  getNewAddress(@Param('walletName') walletName: string) {
    return this.bitcoinService.getNewAddress(walletName);
  }

  @Get('balance/:walletName')
  getWalletBalance(@Param('walletName') walletName: string) {
    return this.bitcoinService.getWalletBalance(walletName);
  }

  @Post('send')
  sendToAddress(@Body() body: { walletName: string; address: string; amount: number }) {
    return this.bitcoinService.sendToAddress(body.walletName, body.address, body.amount);
  }

  @Post('faucet')
  useFaucet(@Body() body: { address: string; amount: number }) {
    return this.bitcoinService.useFaucet(body.address, body.amount);
  }
}
