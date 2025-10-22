import { Test, TestingModule } from '@nestjs/testing';
import { BitcoinService } from './bitcoin.service';
import Client from 'bitcoin-core';

// Mock the bitcoin-core client
const mockCommand = jest.fn();
jest.mock('bitcoin-core', () => {
  return jest.fn().mockImplementation(() => {
    return { command: mockCommand };
  });
});

describe('BitcoinService', () => {
  let service: BitcoinService;

  beforeEach(async () => {
    mockCommand.mockClear();
    (Client as jest.Mock).mockClear();

    const module: TestingModule = await Test.createTestingModule({
      providers: [BitcoinService],
    }).compile();

    service = module.get<BitcoinService>(BitcoinService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getBlockchainInfo', () => {
    it('should call getblockchaininfo command', async () => {
      const expectedResult = { chain: 'test' };
      mockCommand.mockResolvedValue(expectedResult);

      const result = await service.getBlockchainInfo();

      expect(mockCommand).toHaveBeenCalledWith('getblockchaininfo');
      expect(result).toEqual(expectedResult);
    });
  });

  describe('createWallet', () => {
    it('should call createwallet command with the wallet name', async () => {
      const walletName = 'test-wallet';
      const expectedResult = { name: walletName, warning: '' };
      mockCommand.mockResolvedValue(expectedResult);

      const result = await service.createWallet(walletName);

      expect(mockCommand).toHaveBeenCalledWith('createwallet', walletName);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getNewAddress', () => {
    it('should call getnewaddress command for the specified wallet', async () => {
      const walletName = 'test-wallet';
      const expectedAddress = 'tb1...';
      mockCommand.mockResolvedValue(expectedAddress);

      const result = await service.getNewAddress(walletName);

      // Verify that a wallet-specific client was created
      expect(Client).toHaveBeenCalledWith(expect.objectContaining({ wallet: walletName }));
      expect(mockCommand).toHaveBeenCalledWith('getnewaddress');
      expect(result).toEqual(expectedAddress);
    });
  });

  describe('getWalletBalance', () => {
    it('should call getbalance command for the specified wallet', async () => {
      const walletName = 'test-wallet';
      const expectedBalance = 1.23;
      mockCommand.mockResolvedValue(expectedBalance);

      const result = await service.getWalletBalance(walletName);

      expect(Client).toHaveBeenCalledWith(expect.objectContaining({ wallet: walletName }));
      expect(mockCommand).toHaveBeenCalledWith('getbalance');
      expect(result).toEqual(expectedBalance);
    });
  });

  describe('sendToAddress', () => {
    it('should call sendtoaddress command with correct parameters', async () => {
      const walletName = 'test-wallet';
      const address = 'tb1...';
      const amount = 0.5;
      const expectedTxId = 'some-tx-id';
      mockCommand.mockResolvedValue(expectedTxId);

      const result = await service.sendToAddress(walletName, address, amount);

      expect(Client).toHaveBeenCalledWith(expect.objectContaining({ wallet: walletName }));
      expect(mockCommand).toHaveBeenCalledWith('sendtoaddress', address, amount);
      expect(result).toEqual(expectedTxId);
    });
  });
});
