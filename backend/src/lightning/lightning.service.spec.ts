import { Test, TestingModule } from '@nestjs/testing';
import { LightningService } from './lightning.service';
import * as lnService from 'ln-service';

// Mock the ln-service functions
jest.mock('ln-service', () => ({
  authenticatedLndGrpc: jest.fn(() => ({ lnd: {} })),
  getWalletInfo: jest.fn(),
  createInvoice: jest.fn(),
  createChainAddress: jest.fn(),
  getChainBalance: jest.fn(),
  getChannelBalance: jest.fn(),
  pay: jest.fn(),
}));

describe('LightningService', () => {
  let service: LightningService;

  beforeEach(async () => {
    // Reset mocks before each test
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [LightningService],
    }).compile();

    service = module.get<LightningService>(LightningService);
    // Manually trigger the connection logic for testing
    (service as any).connectToLnd();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getWalletInfo', () => {
    it('should call getWalletInfo from ln-service', async () => {
      const expectedInfo = { public_key: 'some-pubkey' };
      (lnService.getWalletInfo as jest.Mock).mockResolvedValue(expectedInfo);

      const result = await service.getWalletInfo();

      expect(lnService.getWalletInfo).toHaveBeenCalled();
      expect(result).toEqual(expectedInfo);
    });
  });

  describe('createInvoice', () => {
    it('should call createInvoice with the correct sats amount', async () => {
      const sats = 1000;
      const expectedInvoice = { request: 'lntb...' };
      (lnService.createInvoice as jest.Mock).mockResolvedValue(expectedInvoice);

      const result = await service.createInvoice(sats);

      expect(lnService.createInvoice).toHaveBeenCalledWith(expect.objectContaining({ tokens: sats }));
      expect(result).toEqual(expectedInvoice);
    });
  });

  describe('getNewAddress', () => {
    it('should call createChainAddress', async () => {
      const expectedAddress = { address: 'tb1...' };
      (lnService.createChainAddress as jest.Mock).mockResolvedValue(expectedAddress);

      const result = await service.getNewAddress();

      expect(lnService.createChainAddress).toHaveBeenCalled();
      expect(result).toEqual(expectedAddress);
    });
  });

  describe('getBalance', () => {
    it('should return on-chain and channel balances', async () => {
      const onChain = { chain_balance: 100000 };
      const channel = { channel_balance: 50000 };
      (lnService.getChainBalance as jest.Mock).mockResolvedValue(onChain);
      (lnService.getChannelBalance as jest.Mock).mockResolvedValue(channel);

      const result = await service.getBalance();

      expect(lnService.getChainBalance).toHaveBeenCalled();
      expect(lnService.getChannelBalance).toHaveBeenCalled();
      expect(result).toEqual({ onChainBalance: onChain.chain_balance, channelBalance: channel.channel_balance });
    });
  });

  describe('payInvoice', () => {
    it('should call pay with the provided invoice', async () => {
      const invoice = 'lntb...';
      const expectedPaymentResult = { is_confirmed: true };
      (lnService.pay as jest.Mock).mockResolvedValue(expectedPaymentResult);

      const result = await service.payInvoice(invoice);

      expect(lnService.pay).toHaveBeenCalledWith(expect.objectContaining({ request: invoice }));
      expect(result).toEqual(expectedPaymentResult);
    });
  });
});
