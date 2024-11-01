'use client';

import { useAccount, WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import config from '@/config';
import dynamic from 'next/dynamic';

const queryClient = new QueryClient();

const PNfts = dynamic(() => import('@/components/PNft'), { ssr: false });

const ConnectNftWallet = () => {
    const { isConnected, address } = useAccount();
    const walletAddress = address as string
    console.log(walletAddress)
    
    return isConnected ? <PNfts address={walletAddress} /> : "Nothing";
};

const OwnedNfts = () => {
    return (
        <div style={{ width: "75vw" }}>
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    <ConnectNftWallet />
                </QueryClientProvider>
            </WagmiProvider>
        </div>
    );
};

export default OwnedNfts;
