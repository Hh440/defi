'use client';

import { useState, useEffect } from 'react';
import { useConnect } from 'wagmi';

const WalletOptions = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { connectors, connect } = useConnect();
  
  useEffect(() => {
    setIsMounted(true); 
  }, []);

  console.log(connectors);

  if (!isMounted) return null; 
  if (!connectors.length) return <div>No connectors available</div>;

  const handleConnect = (connector: any) => {
    console.log(`Attempting to connect with ${connector.name} (id: ${connector.id})`);

    try {
      connect({ connector });
      console.log(`Successfully connected with ${connector.name}`);
    } catch (error) {
      console.error(`Connection failed with ${connector.name}:`, error);
    } 
  };

  connectors.forEach((connector) => {
    console.log(`Connector ID: ${connector.id} - Name: ${connector.name}`);
  });

  return (
    <div className="flex items-center justify-center w-full h-full bg-black p-6 space-x-4">
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
  );
};

export default WalletOptions;
