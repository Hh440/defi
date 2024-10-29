import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Box, FileText, Settings } from 'lucide-react';
import axios from 'axios';

type Block = {
  id: number;
  number: number;                 // Block number in decimal
  age: string;                     // Calculated age in human-readable format (from timestamp)
  baseFeePerGas: string;           // Base fee per gas in hex
  difficulty: string;              // Mining difficulty in hex
  extraData: string;               // Additional data field in hex
  gasLimit: string;                // Gas limit in hex
  gasUsed: string;                 // Gas used in hex
  hash: string;                    // Block hash
  logsBloom: string;               // Logs bloom filter in hex
  miner: string;                   // Fee recipient or miner address
  mixHash: string;                 // Mix hash in hex
  nonce: string;                   // Nonce in hex
  parentHash: string;              // Parent block hash
  receiptsRoot: string;            // Receipts root hash
  sha3Uncles: string;              // SHA3 of uncles
  size: string;                    // Size of the block in hex
  stateRoot: string;               // State root hash
  timestamp: string;               // Timestamp in hex
  totalDifficulty: string;         // Total difficulty in hex
  transactionRoot: string | null;  // Transaction root hash (null if empty)
  uncles: string[];                // List of uncle hashes
  withdrawalsRoot: string;         // Withdrawals root hash
};

type Transaction = {
  id: number;
  blockHash: string;
  block_number: string;
  from: string;
  gas: string;
  gasPrice: string;
  hash: string;
  input: string;
  nonce: string;
  to: string;
  transactionIndex: string;
  value: string;
  age: string;                     // Add age field for displaying time
};

export default function BlockchainExplorer() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]); // State for transactions

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/blocks');
        const fetchedBlocks: Block[] = response.data.map((block: any) => ({
          ...block,
          age: calculateAge(block.timestamp), // Convert timestamp to a human-readable format
        }));
        setBlocks(fetchedBlocks);
        console.log(fetchedBlocks);
      } catch (error) {
        console.error('Error fetching blocks:', error);
      }
    };

    const fetchTransactions = async () => { // New function to fetch transactions
      try {
        const response = await axios.get('http://localhost:3000/transactions');
        const fetchedTransactions: Transaction[] = response.data.map((tx: any) => ({
          ...tx,
          age: calculateAge(tx.block_number), // You may adjust how age is calculated for transactions
        }));
        setTransactions(fetchedTransactions);
        console.log(fetchedTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchBlocks();
    fetchTransactions(); // Call the fetchTransactions function
  }, []);

  const calculateAge = (timestamp: string): string => {
    const blockTime = parseInt(timestamp, 16) * 1000;
    const diff = Date.now() - blockTime;
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return `${seconds} secs ago`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes} mins ago`;
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Latest Blocks</CardTitle>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Customize
            </Button>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto"> {/* Added overflow for scrolling */}
            {blocks.map((block) => (
              <div key={block.number} className="flex items-center space-x-4 py-2">
                <Box className="h-6 w-6 text-primary" />
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="text-primary font-medium">{block.number}</span>
                    <span className="text-muted-foreground text-sm ml-2">{block.age}</span>
                  </div>
                  <div className="text-sm">
                    Fee Recipient <span className="text-primary">{block.miner}</span>
                  </div>
                  <div className="text-sm text-primary">
                    Difficulty <span className="text-muted-foreground">{parseInt(block.difficulty, 16)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{(parseInt(block.gasUsed, 16) / 1e9).toFixed(5)} Eth</div>
                </div>
              </div>
            ))}
            <Button variant="link" className="w-full mt-2">
              VIEW ALL BLOCKS →
            </Button>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Latest Transactions</CardTitle>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Customize
            </Button>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto"> {/* Added overflow for scrolling */}
            {transactions.map((tx) => (
              <div key={tx.hash} className="flex items-center space-x-4 py-2">
                <FileText className="h-6 w-6 text-primary" />
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="text-primary font-medium truncate">{tx.hash}</span> {/* Added truncate */}
                    <span className="text-muted-foreground text-sm ml-2">{tx.age}</span>
                  </div>
                  <div className="text-sm">
                    From <span className="text-primary">{tx.from}</span>
                  </div>
                  <div className="text-sm">
                    To <span className="text-primary">{tx.to}</span>
                  </div>
                  <div className="text-sm">
                    Value <span className="text-primary">{parseInt(tx.value, 16) / 1e18} ETH</span> {/* Assuming value is in wei */}
                  </div>
                </div>
              </div>
            ))}
            <Button variant="link" className="w-full mt-2">
              VIEW ALL TRANSACTIONS →
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
