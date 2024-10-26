'use client';

import '@solana/wallet-adapter-react-ui/styles.css';
import { WagmiProvider,useAccount } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import config from '@/config';


import dynamic from 'next/dynamic';

const queryClient = new QueryClient();

const Account = dynamic(() => import('./Account'), { ssr: false }); 
const WalletOptions= dynamic(()=>import('./WalletOptions') ,{ssr:false})


const ConnectWallet = () => {
    const { isConnected } = useAccount();
    return isConnected ? <Account /> : <WalletOptions />;
  };
  


const Homepage = () => {
    return (
        <div className="flex justify-end h-screen bg-black text-white p-4" style={{width:"75vw"}}>
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                   <ConnectWallet/>
                </QueryClientProvider>
            </WagmiProvider>
        </div>
    );
};




export default Homepage;
