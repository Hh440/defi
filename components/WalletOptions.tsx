'use client';

import { useState, useEffect } from 'react';
import { Connector, useConnect } from 'wagmi';
import WalletNotConnected from './walletNotConnected';

const WalletOptions = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const { connectors, connect, isSuccess } = useConnect();

  useEffect(() => {
    setIsMounted(true); 
  }, []);

  // Set isConnected to true if isSuccess becomes true
  useEffect(() => {
    if (isSuccess) {
      setIsConnected(true);
    }
  }, [isSuccess]);

  if (!isMounted) return null; 
  if (!connectors.length) return <div>No connectors available</div>;

  const handleConnect = async (connector: Connector) => {
    console.log(`Attempting to connect with ${connector.name} (id: ${connector.id})`);
    try {
      await connect({ connector });
      console.log(`Successfully connected with ${connector.name}`);
    } catch (error) {
      console.error(`Connection failed with ${connector.name}:`, error);
    } 
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black p-6" style={{ width: "75vw", height: "30vw" }}>
      {!isConnected && <WalletNotConnected />}

      <div className="flex flex-row space-x-4">
        {connectors.map((connector) => (
          <button
            key={connector.id}
            onClick={() => handleConnect(connector)}
            className="px-6 py-3 text-white font-semibold rounded-lg bg-black hover:bg-gray-800 border border-gray-600"
          >
            {connector.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WalletOptions;
