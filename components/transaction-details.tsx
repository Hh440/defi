'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CopyIcon, InfoIcon, RefreshCw, Search } from 'lucide-react';
import { JsonRpcProvider } from 'ethers';

interface TransactionDetailProps {
  txId: string;
}

interface Transaction {
  signature: string;
  result: number;
  timestamp: string;
  confirmationStatus: number;
  confirmations: string;
  nonce: string;
  recentBlockhash: string;
  fee: number;
  computeUnitsConsumed: string; 
  gasPrice: string;
}

export default function TransactionDetails({ txId }: TransactionDetailProps) {
  const [txDetails, setTxDetails] = useState<Transaction | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); 

  const fetchTransactionDetails = async () => {
    const provider = new JsonRpcProvider("https://solemn-black-surf.quiknode.pro/f40b179076ea606dfb739b393689fcd03d654861/");
    setLoading(true); 
    try {
      const network = await provider.send('bb_getTx', [txId]);

      
      const details: Transaction = {
        signature: network.txid,
        result: network.ethereumSpecific.status,
        timestamp: network.blockTime,
        confirmationStatus: network.ethereumSpecific.status,
        confirmations: network.confirmations,
        nonce: network.ethereumSpecific.nonce,
        recentBlockhash: network.blockHash,
        fee: network.fees,
        computeUnitsConsumed: network.ethereumSpecific.gasUsed,
        gasPrice: network.ethereumSpecific.gasPrice,
      };

      setTxDetails(details);
    } catch (error) {
      console.error("Error fetching transaction details:", error);
      alert("Failed to fetch transaction details. Please try again."); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactionDetails();
    
  }, [txId]);



  useEffect(()=>{
    if(txDetails){
      console.log(txDetails)
    }
  })

  const handleCopy = () => {
    if (txDetails?.signature) {
      navigator.clipboard.writeText(txDetails.signature)
        .then(() => {
          alert('Signature copied to clipboard!'); 
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    }
  };

  const handleRefresh = () => {
    fetchTransactionDetails();
  };

  return (
    <div className="w-full max-w-4xl p-4 bg-gray-900 text-gray-100" style={{width:"75vw"}}>
      <div className="mb-4">
        <span className="text-sm text-gray-400">DETAILS</span>
        <h1 className="text-2xl font-bold">Transaction</h1>
      </div>
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Overview</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-gray-300 border-gray-600">
              <Search className="h-4 w-4 mr-2" />
              Inspect
            </Button>
            <Button variant="outline" size="sm" className="text-gray-300 border-gray-600" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4">
          {loading ? ( 
            <div className="flex justify-center items-center h-32">
              <span className="loader" /> 
            </div>
          ) : (
            <>
              <div className="grid grid-cols-[1fr,auto] items-center gap-2">
                <span className="text-gray-400">Signature</span>
                <div className="flex items-center gap-2 font-mono text-sm">
                  <span className="truncate max-w-[300px]">{txDetails?.signature}</span>
                  <CopyIcon className="h-4 w-4 text-gray-500 cursor-pointer" onClick={handleCopy} />
                </div>
              </div>
              <div className="grid grid-cols-[1fr,auto] items-center gap-2">
                <span className="text-gray-400">Result</span>
                <Badge variant="outline" className="bg-green-900 text-green-400 border-green-400">
                  {txDetails?.result ===1 ? "Success" : "Failure"}
                </Badge>
              </div>
              <div className="grid grid-cols-[1fr,auto] items-center gap-2">
                <span className="text-gray-400">Timestamp</span>
                <span>{txDetails?.timestamp}</span>
              </div>
              <div className="grid grid-cols-[1fr,auto] items-center gap-2">
                <span className="text-gray-400">Confirmation Status</span>
                <span>{txDetails?.confirmationStatus === 1 ? "FINALIZED" : "PENDING"}</span>
              </div>
              <div className="grid grid-cols-[1fr,auto] items-center gap-2">
                <span className="text-gray-400">Confirmations</span>
                <span>{txDetails?.confirmations}</span>
              </div>
              <div className="grid grid-cols-[1fr,auto] items-center gap-2">
                <span className="text-gray-400">Nonce</span>
                <div className="flex items-center gap-2 font-mono">
                  <span>{txDetails?.nonce}</span>
                  <CopyIcon className="h-4 w-4 text-gray-500 cursor-pointer" onClick={handleCopy} />
                </div>
              </div>
              <div className="grid grid-cols-[1fr,auto] items-center gap-2 ">
                <span className="text-gray-400">Blockhash</span>
                <div className="flex items-center gap-2">
                <span className="font-mono text-sm">
                  {txDetails?.recentBlockhash && (
                    <>
                      {txDetails.recentBlockhash.slice(0, 6)}...{txDetails.recentBlockhash.slice(-4)}
                    </>
                  )}
                </span>
                  <InfoIcon
                    className="h-4 w-4 text-gray-500 cursor-pointer"
                    onMouseEnter={() => setTooltipVisible(true)}
                    onMouseLeave={() => setTooltipVisible(false)}
                  />
                  {tooltipVisible && (
                    <div className="absolute z-10 bg-gray-800 text-gray-200 p-2 text-sm rounded-md mb-8">
                      The blockhash is a unique identifier for the block that contains the transaction.
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-[1fr,auto] items-center gap-2">
                <span className="text-gray-400">Fee</span>
                <span className="font-mono">◎{txDetails?.fee}</span>
              </div>
              <div className="grid grid-cols-[1fr,auto] items-center gap-2">
                <span className="text-gray-400">Compute units consumed</span>
                <span>{txDetails?.computeUnitsConsumed}</span>
              </div>
              <div className="grid grid-cols-[1fr,auto] items-center gap-2">
                <span className="text-gray-400">Gas Price</span>
                <span>{txDetails?.gasPrice}</span>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
