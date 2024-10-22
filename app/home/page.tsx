'use client'

import Homepage from "@/components/Homepage"

import '@solana/wallet-adapter-react-ui/styles.css';

import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
const Main =()=>{
    return(
        

       <div className=" h-screen"  style={{ width: '75vw' }}> 
  
  <section className="flex flex-col w-full gap-5 ml-20 h-full">
  
    {/* Solana Wallet Components */}
    <ConnectionProvider endpoint={'https://solana-mainnet.g.alchemy.com/v2/bN7nlZQIEly-Vv752sdL8zXX4-9Ygd-W'}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="flex justify-end items-end space-x-4 px-6 py-3">
            <WalletMultiButton className="wallet-button bg-indigo-600 hover:bg-indigo-700 transition-all duration-300" />
            <WalletDisconnectButton className="wallet-button bg-red-600 hover:bg-red-700 transition-all duration-300" />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>

  </section>
</div>

      
    )
}

export default Main