import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import {
  authenticatedLndGrpc,
  AuthenticatedLnd,
  getWalletInfo,
  createInvoice,
  getChannelBalance,
  getChainBalance,
  createChainAddress,
  pay,
} from 'ln-service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LightningService implements OnModuleInit {
  private lnd: AuthenticatedLnd;
  private readonly logger = new Logger(LightningService.name);

  onModuleInit() {
    // It might take a moment for LND to generate the files on first startup.
    // A simple timeout can help, but a more robust solution would be a retry mechanism.
    setTimeout(() => this.connectToLnd(), 5000);
  }

  private connectToLnd() {
    const certPath = path.resolve(process.cwd(), '../lnd_data/tls.cert');
    const macaroonPath = path.resolve(
      process.cwd(),
      '../lnd_data/data/chain/bitcoin/testnet/admin.macaroon',
    );

    if (!fs.existsSync(certPath) || !fs.existsSync(macaroonPath)) {
      this.logger.error(
        'LND cert or macaroon not found. Make sure LND is running and has generated the files.',
      );
      return;
    }

    const cert = fs.readFileSync(certPath, 'utf-8');
    const macaroon = fs.readFileSync(macaroonPath).toString('base64');
    const socket = '127.0.0.1:10009';

    try {
      const { lnd } = authenticatedLndGrpc({
        cert,
        macaroon,
        socket,
      });
      this.lnd = lnd;
      this.logger.log('Successfully connected to LND gRPC');
    } catch (error) {
      this.logger.error('Failed to connect to LND', error);
    }
  }

  private getLnd() {
    if (!this.lnd) {
      throw new Error('LND is not connected');
    }
    return this.lnd;
  }

  async getWalletInfo() {
    return getWalletInfo({ lnd: this.getLnd() });
  }

  async createInvoice(sats: number) {
    return createInvoice({ lnd: this.getLnd(), tokens: sats });
  }

  async getNewAddress() {
    return createChainAddress({ lnd: this.getLnd() });
  }

  async getBalance() {
    const lnd = this.getLnd();
    const onChainBalance = await getChainBalance({ lnd });
    const channelBalance = await getChannelBalance({ lnd });
    return {
      onChainBalance: onChainBalance.chain_balance,
      channelBalance: channelBalance.channel_balance,
    };
  }

  async payInvoice(invoice: string) {
    return pay({ lnd: this.getLnd(), request: invoice });
  }
}
