'use client';

import { useRouter } from 'next/navigation'; 
import { Card, CardContent } from "@/components/ui/card";
import { QrCode } from "lucide-react";
import { useEffect, useState } from "react";
import { useAccount, useBalance, useDisconnect } from 'wagmi';

const WalletBalance = () => {
  const router = useRouter(); 
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const balance = useBalance({ address });

  const [display, setDisplay] = useState('');

  useEffect(() => {
    if (balance.data) {
      setDisplay(balance.data.formatted);
    }
  }, [balance.data]); 

  const maskPublicKey = (key: string) => {
    return `${key.slice(0, 4)} ${key.slice(4, 8)} ${key.slice(-5, -1)}`;
  };

  const handleDisconnect = () => {
    disconnect(); 
    router.push('/'); 
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="flex flex-col items-center"> 
        <Card className="aspect-[1.6/1] relative overflow-hidden bg-gradient-to-br from-primary to-primary-foreground border-2 opacity-90" style={{ width: "25vw" }}>
          <CardContent className="relative h-full flex flex-col justify-between p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-300">Ethereum Balance</h2>
                <p className="text-4xl font-extrabold text-white mt-2">
                  {display} 
                </p>
              </div>
              <div className="bg-gray-700 rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 128"
                  className="w-10 h-10"
                >
                  <path
                    d="M32 0L0 64l32 16L64 64 32 0z"
                    fill="#3C3C3D"
                  />
                  <path
                    d="M32 128l32-64-32-16-32 16 32 64z"
                    fill="#8C8C8C"
                  />
                </svg>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-gray-800 text-xs">Wallet Address</p>
                  <p className="text-gray-200 text-sm font-medium">
                    {address ? maskPublicKey(address) : 'Not connected'} 
                  </p>
                </div>
                <div className="bg-gray-700 p-2 rounded">
                  <QrCode className="w-8 h-8 text-gray-300" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        
        <button 
          onClick={handleDisconnect} 
          className="mt-6 bg-red-600 hover:bg-red-500 text-white font-medium py-2 px-6 rounded-lg shadow-lg transition duration-300 transform hover:scale-105" // Added shadow and transform for a nice effect
        >
          Disconnect
        </button>
      </div>
    </div>
  );
};

export default WalletBalance;
