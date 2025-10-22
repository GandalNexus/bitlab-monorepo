import { Injectable } from '@nestjs/common';
import Client from 'bitcoin-core';

@Injectable()
export class BitcoinService {
  private readonly client: Client;

  constructor() {
    this.client = this.createClient();
  }

  private createClient(wallet?: string): Client {
    const config = {
      host: '127.0.0.1',
      port: 18332,
      username: 'user',
      password: 'pass',
      wallet,
    };
    return new Client(config);
  }

  async getBlockchainInfo() {
    return this.client.command('getblockchaininfo');
  }

  async createWallet(walletName: string) {
    return this.client.command('createwallet', walletName);
  }

  async getNewAddress(walletName: string): Promise<string> {
    const walletClient = this.createClient(walletName);
    return walletClient.command('getnewaddress');
  }

  async getWalletBalance(walletName: string): Promise<number> {
    const walletClient = this.createClient(walletName);
    return walletClient.command('getbalance');
  }

  async sendToAddress(
    walletName: string,
    address: string,
    amount: number,
  ): Promise<string> {
    const walletClient = this.createClient(walletName);
    return walletClient.command('sendtoaddress', address, amount);
  }

  async useFaucet(address: string, amount: number): Promise<string> {
    const faucetWallet = 'faucet'; // Assuming a 'faucet' wallet exists and is funded
    try {
      await this.client.command('loadwallet', faucetWallet);
    } catch (error) {
      if (!error.message.includes('Wallet \"faucet\" is already loaded')) {
        try {
          await this.createWallet(faucetWallet);
        } catch (e) {
          // Ignore if it already exists
        }
      }
    }
    const walletClient = this.createClient(faucetWallet);
    return walletClient.command('sendtoaddress', address, amount);
  }
}
