'use client'

import dynamic from "next/dynamic";


import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import config from '@/config';


const WalletBalance = dynamic(() => import('@/components/WalletBalance').then(mod => mod.default), { ssr: false });

const queryClient = new QueryClient()
const WalletPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100" style={{ width: '75vw' }}>
     <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                   <WalletBalance/>
                </QueryClientProvider>
            </WagmiProvider>
    </div>
  );
};

export default WalletPage;
