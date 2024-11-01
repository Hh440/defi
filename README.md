# BlockScope

**Explore Blocks, Track Transactions, and Showcase NFTs**

BlockScope is a Dapp designed to streamline blockchain exploration by offering real-time block and transaction tracking, advanced search functionality for specific blocks and transactions, and a personal NFT portfolio view. Built with QuickNode integration, this app provides users with a simple and efficient way to interact with blockchain data.

## Features

- **Real-time Monitoring**: Fetches the latest blocks and transactions using QuickNode Streams and Functions.
- **Advanced Search**: Easily search for specific transactions or blocks using QuickNode’s JSON-RPC provider.
- **NFT Viewer**: Displays the user’s NFTs in a secure, accessible format.

## Technologies Used

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Node.js, Prisma, PostgreSQL
- **Blockchain Services**: QuickNode Functions, QuickNode Streams, JSON-RPC Provider by QuickNode


## Backend Server : 
- **Link** : [https://github.com/Hh440/webhook_defi.git](https://github.com/Hh440/webhook_defi.git)
## Installation

1. **Clone the repository**

   ```bash
   git clone [https://github.com/yourusername/BlockScope.git](https://github.com/aasiflm10/BlockScope.git)
   cd BlockScope
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

## Challenges We Encountered

- **Real-Time Data Synchronization**: Managing live data with QuickNode streams posed challenges due to occasional lags. We added a fallback polling method to keep data consistent.
- **Optimizing RPC Calls**: High traffic affected the response time for block and transaction searches, so we implemented caching to improve speed and efficiency.

## Usage

- **Real-time Block Updates**: View live updates on the latest blocks and transactions.
- **Search**: Search for a specific block or transaction by entering its ID or hash.
- **NFT Viewer**: Connect your wallet to see your NFT assets directly within the app.

## Contributing

1. **Fork the project**
2. **Create your feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

## License

This project is made for Quicknode BuildOn Hackathon.
