'use client';

import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';
import { useState } from 'react';
import { Wallet, Send, LogOut, Copy, Check, DollarSign, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSendTransaction } from 'wagmi';
import { parseEther } from 'viem';
import { isAddress } from 'ethers';

const Account = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });
  const [receiverKey, setReceiverKey] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [copied, setCopied] = useState(false);
  
  const{data:hash,sendTransaction}=useSendTransaction()


  const handleSendTransaction = () => {
    if (!isAddress(receiverKey)) {
      alert('Please enter a valid Ethereum address.');
      return;
    }
  
    try {
      console.log(`Sending ${transactionAmount} ETH to ${receiverKey}`);
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
    <div className="min-h-[calc(100vh-3rem)] flex items-center justify-center p-4 " style={{ width: "75vw" }}>
      <Card className="w-full max-w-xl mx-auto overflow-hidden bg-background/95 backdrop-blur-sm shadow-2xl border-2 border-primary/20 flex-grow">
        <CardHeader className="flex flex-col items-center space-y-4 pb-8 pt-6 px-6 bg-gradient-to-r from-primary/10 to-secondary/10">
          <Wallet className="w-14 h-14 text-primary" />
          <CardTitle className="text-4xl font-bold text-primary text-center">Ethereum Wallet</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 p-6">
          {/* Public Key Display */}
          <Card className="bg-primary/5 border-2 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-primary">Your Public Key</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {address && (
                <div className="flex items-center justify-between bg-background/80 rounded-md p-3">
                  <p className="text-xl font-mono text-foreground">
                    {ensName ? `${ensName} (${formatAddress(address)})` : formatAddress(address)}
                  </p>
                  <Button variant="outline" size="icon" onClick={handleCopyPublicKey} className="ml-2">
                    {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Receiver's Public Key Input */}
          <Card className="bg-primary/5 border-2 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-primary">Receiver's Public Key</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center bg-background/80 rounded-md">
                <User className="w-6 h-6 text-muted-foreground ml-3" />
                <Input
                  placeholder="Enter receiver's public key"
                  value={receiverKey}
                  onChange={(e) => setReceiverKey(e.target.value)}
                  className="text-xl border-0 focus-visible:ring-0"
                />
              </div>
            </CardContent>
          </Card>

          {/* Transaction Amount Input */}
          <Card className="bg-primary/5 border-2 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-primary">Transaction Amount</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center bg-background/80 rounded-md">
                <DollarSign className="w-6 h-6 text-muted-foreground ml-3" />
                <Input
                  placeholder="Enter amount in ETH"
                  type="number"
                  value={transactionAmount}
                  onChange={(e) => setTransactionAmount(e.target.value)}
                  className="text-xl border-0 focus-visible:ring-0"
                />
              </div>
            </CardContent>
          </Card>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 p-6 bg-gradient-to-r from-primary/10 to-secondary/10">
          <Button 
            className="w-full text-xl py-6 bg-primary hover:bg-primary/90" 
            onClick={handleSendTransaction}
            disabled={!receiverKey || !transactionAmount}
          >
            <Send className="w-6 h-6 mr-2" />
            Send Transaction
          </Button>
          <Button variant="outline" className="w-full text-xl py-6 border-2 bg-background/50 hover:bg-background/80" onClick={() => disconnect()}>
            <LogOut className="w-6 h-6 mr-2" />
            Disconnect Wallet
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Account;
