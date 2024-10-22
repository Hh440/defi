import '@solana/wallet-adapter-react-ui/styles.css';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Wallet } from 'lucide-react'; // Imported but unused

import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'; // Example of importing wallets


const Homepage = () => {
    const wallets = [new PhantomWalletAdapter()]; // Add wallet adapters here

    return (
        <div>
            <div className='item-end'>
                <ConnectionProvider endpoint={'https://solana-mainnet.g.alchemy.com/v2/bN7nlZQIEly-Vv752sdL8zXX4-9Ygd-W'}>
                    <WalletProvider wallets={wallets} autoConnect>
                        <WalletModalProvider>
                            <div className="flex justify-end items-center space-x-4 px-6 py-3 ">
                                <WalletMultiButton className="wallet-button bg-indigo-600 hover:bg-indigo-700 transition-all duration-300" />
                                <WalletDisconnectButton className="wallet-button bg-red-600 hover:bg-red-700 transition-all duration-300" />
                            </div>
                        </WalletModalProvider>
                    </WalletProvider>
                </ConnectionProvider>
            </div>

        
            
        </div>
    );
};

export default Homepage;
