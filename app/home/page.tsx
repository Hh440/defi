"use client";
import { WagmiProvider,useAccount } from "wagmi";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import config from "@/config";
import BlockchainExplorer from "@/components/blockchain-explorer";
import dynamic from "next/dynamic";


const WalletConnected = dynamic(() => import('@/components/walletConnected'), { ssr: false }); 
const WalletOptions= dynamic(()=>import('@/components/WalletOptions') ,{ssr:false})

const Main = () => {
  const queryClient = new QueryClient();

  const ConnectWallet = () => {
    const { isConnected } = useAccount();
    return isConnected ? <WalletConnected/>: <WalletOptions />;
  };
  
  return (
    <div style={{ width: "75vw" }}>
      <section className="flex flex-col ml-20 ">
        <div className="flex justify-end items-end mb-20 px-6 ">
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <Suspense fallback={<div>Loading...</div>}>
                <ConnectWallet/>
              </Suspense>
            </QueryClientProvider>
          </WagmiProvider>
        </div>

        {/* Adding margin to reduce gap between WalletOptions and BlockchainExplorer */}
        <div className="mb-7">
          <BlockchainExplorer />
        </div>
      </section>
    </div>
  );
};

export default Main;


