# Bitcoin Lab

Welcome to the Bitcoin Lab! This project is a comprehensive backend service that provides a development environment for interacting with both the Bitcoin blockchain (on-chain) and the Lightning Network. It's designed to be a sandbox for developers to build and test Bitcoin-related applications.

The lab runs `bitcoind` and `lnd` nodes in a Docker environment, exposing a rich set of API endpoints through a NestJS backend.

## Features

### On-Chain (Bitcoin)
- **Wallet Management**: Create and manage on-chain Bitcoin wallets.
- **Address Generation**: Generate new Bitcoin addresses for receiving funds.
- **Balance Checking**: Get the balance of any wallet.
- **Transaction Sending**: Send testnet bitcoin to any address.
- **Blockchain Info**: Get current information about the testnet blockchain.
- **Faucet**: A simple faucet to get testnet coins for development.

### Lightning Network
- **Wallet Info**: Get information about the LND node, including its public key.
- **Invoice Management**: Create and pay Lightning invoices.
- **Address Generation**: Generate on-chain addresses to fund the LND wallet.
- **Balance Checking**: Get both on-chain and channel balances.

## Technology Stack

- **Backend**: [NestJS](https://nestjs.com/) (TypeScript)
- **Bitcoin Node**: [bitcoind](https://github.com/bitcoin/bitcoin)
- **Lightning Node**: [LND (Lightning Network Daemon)](https://github.com/lightningnetwork/lnd)
- **Containerization**: [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- **Bitcoin Interaction**: `bitcoin-core` library
- **Lightning Interaction**: `ln-service` library

## Setup and Usage

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/en/) (v16 or later)
- [npm](https://www.npmjs.com/)

### 1. Start the Bitcoin and LND Nodes

From the project root, start the Docker containers in detached mode:

```bash
docker-compose up -d
```

This will start `bitcoind` and `lnd`. The first time you run this, it will take a while for `bitcoind` to download the testnet blockchain.

### 2. Create and Unlock the LND Wallet

The first time you start LND, you need to create a wallet. You will be prompted to create a password.

```bash
docker-compose exec lnd lncli create
```

On subsequent startups, you will need to unlock the wallet with the password you created:

```bash
docker-compose exec lnd lncli unlock
```

### 3. Install Backend Dependencies

Navigate to the `backend` directory and install the npm packages:

```bash
cd backend
npm install
```

### 4. Start the Backend Server

Run the NestJS application in development mode:

```bash
npm run start:dev
```

The backend will be available at `http://localhost:3000`.

### 5. Fund Your Wallets

To use the on-chain and Lightning features, you'll need testnet bitcoin.

- **On-Chain**: Use the built-in faucet endpoint (`POST /bitcoin/faucet`) to send funds to an address.
- **Lightning**: First, get a new on-chain address from your LND node (`GET /lightning/address`). Then, use the faucet to send funds to that address.

--- 

## API Reference

### Bitcoin (On-Chain) Endpoints

**GET /bitcoin/blockchain-info**
- **Description**: Get information about the testnet blockchain.

**POST /bitcoin/wallet**
- **Description**: Create a new on-chain wallet.
- **Body**: `{ "walletName": "my-wallet" }`

**GET /bitcoin/address/:walletName**
- **Description**: Get a new address for the specified wallet.

**GET /bitcoin/balance/:walletName**
- **Description**: Get the balance of the specified wallet.

**POST /bitcoin/send**
- **Description**: Send bitcoin from a wallet to an address.
- **Body**: `{ "walletName": "my-wallet", "address": "tb1...", "amount": 0.01 }`

**POST /bitcoin/faucet**
- **Description**: Send testnet coins to a specified address from the faucet wallet.
- **Body**: `{ "address": "tb1...", "amount": 0.5 }`

### Lightning Network Endpoints

**GET /lightning/info**
- **Description**: Get information about the LND node.

**POST /lightning/invoice**
- **Description**: Create a new Lightning invoice.
- **Body**: `{ "sats": 1000 }`

**GET /lightning/address**
- **Description**: Get a new on-chain address to fund the LND wallet.

**GET /lightning/balance**
- **Description**: Get the on-chain and channel balances for the LND node.

**POST /lightning/pay**
- **Description**: Pay a Lightning invoice.
- **Body**: `{ "invoice": "lntb..." }`