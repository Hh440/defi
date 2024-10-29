"use client";
import { WagmiProvider } from "wagmi";
import { Suspense } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import config from "@/config";
import WalletOptions from "@/components/WalletOptions";
import BlockchainExplorer from "@/components/blockchain-explorer";
const Main = () => {
  const queryClient = new QueryClient();
  return (
    <div className="h-screen" style={{ width: "75vw" }}>
      <section className="flex flex-col w-full gap-5 ml-20 h-full">
        <div className="flex justify-end items-end space-x-4 px-6 py-3">
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <Suspense fallback={<div>Loading...</div>}>
                <WalletOptions />
              </Suspense>
            </QueryClientProvider>
          </WagmiProvider>
        </div>
        <BlockchainExplorer/>
      </section>
    </div>
  );
};

export default Main;
