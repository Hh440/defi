'use client';

import { useAccount, useDisconnect, useEnsName, useSendTransaction } from 'wagmi';
import { useState } from 'react';
import { Wallet, Send, LogOut, Copy, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { parseEther } from 'viem';
import { isAddress } from 'ethers';

export default function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const [receiverKey, setReceiverKey] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [copied, setCopied] = useState(false);
  
  const { sendTransaction } = useSendTransaction();

  const handleSendTransaction = () => {
    if (!isAddress(receiverKey)) {
      alert('Please enter a valid Ethereum address.');
      return;
    }
  
    try {
      sendTransaction({ to: receiverKey as `0x${string}`, value: parseEther(transactionAmount) });
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  const handleCopyPublicKey = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatAddress = (addr: string | undefined) => 
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '';

  return (
    <Card className="w-full max-w-md mx-auto bg-background/95 shadow-lg border border-primary/20">
      <CardHeader className="space-y-1 text-center">
        <Wallet className="w-6 h-6 mx-auto text-primary" />
        <CardTitle className="text-xl font-semibold">Ethereum Wallet</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-2 bg-primary/5 rounded-md">
          <span className="text-sm font-mono">
            {ensName ? `${ensName} (${formatAddress(address)})` : formatAddress(address)}
          </span>
          <Button variant="ghost" size="icon" onClick={handleCopyPublicKey}>
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
        <Input
          placeholder="Receiver's public key"
          value={receiverKey}
          onChange={(e) => setReceiverKey(e.target.value)}
          className="text-sm"
        />
        <Input
          placeholder="Amount in ETH"
          type="number"
          value={transactionAmount}
          onChange={(e) => setTransactionAmount(e.target.value)}
          className="text-sm"
        />
        <Button 
          className="w-full" 
          onClick={handleSendTransaction}
          disabled={!receiverKey || !transactionAmount}
        >
          <Send className="w-4 h-4 mr-2" />
          Send
        </Button>
        <Button variant="outline" className="w-full" onClick={() => disconnect()}>
          <LogOut className="w-4 h-4 mr-2" />
          Disconnect
        </Button>
      </CardContent>
    </Card>
  );
}