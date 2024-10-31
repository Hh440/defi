'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {  ExternalLink, Info, Search, Settings } from 'lucide-react'
import { JsonRpcProvider } from 'ethers'
import { TRANSCATION_BLOCKS } from '@/project'

interface BlockExplorerProps{
  blockHash:string
}
interface Block {
  hash: string
  previousBlockHash: string
  nextBlockHash?: string
  height?: string
  confirmations?: string
  size?: string
  time?: string
  version?: string
  merkleRoot?: string
  nonce?: string
  bits?: string
  difficulty?: string
  transactionsCount?: number
  
}


export default function BlockExplorer({blockHash}:BlockExplorerProps) {

  const[blockDetails,setBlockDetails]=useState<Block|null>(null)


  useEffect(()=>{
    const fetchBlockDetails=async()=>{
      try {
        const provider = new JsonRpcProvider(TRANSCATION_BLOCKS)
        const network = await provider.send("bb_getBlock", [blockHash])
        
        const Block:Block={
          hash:blockHash,
          previousBlockHash:network.previousBlockHash,
          nextBlockHash:network.nextBlockHash,
          height:network.height,
          confirmations:network.confirmations,
          size:network.size,
          time:calculateAge(network.time),
          version:network.version,
          merkleRoot:network.merkleRoot,
          nonce:network.nonce,
          bits:network.bits,
          difficulty:network.difficulty,
          transactionsCount: network.txCount,
          


        }
        console.log(network)
        setBlockDetails(Block)
      } catch (error) {
        console.error("Failed to fetch block details:", error)
      }
    }

    fetchBlockDetails()
  },[blockHash])

  

  
  

  const calculateAge = (timestamp: string): string => {
    const blockTime = parseInt(timestamp) * 1000
    const diff = Date.now() - blockTime
    const seconds = Math.floor(diff / 1000)
    if (seconds < 60) return `${seconds} secs ago`
    const minutes = Math.floor(seconds / 60)
    return `${minutes} mins ago`
  }






  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-muted/50">
        <div className="flex items-center space-x-4">
          <span className="text-green-600 dark:text-green-400">ETH Price: $2,488.55 (+0.80%)</span>
          <span className="text-muted-foreground">Gas: 8.318 Gwei</span>
        </div>
        <div className="flex items-center space-x-2">
          <Input 
            className="w-96" 
            placeholder="Search by Address / Txn Hash / Block / Token / Domain Name"
          />
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ExternalLink className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-2">Block #{blockDetails?.height}</h1>
          <div className="flex space-x-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              <Info className="h-4 w-4 mr-1" />
              MEV Block
            </Badge>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              <Info className="h-4 w-4 mr-1" />
              EigenPhi
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="consensus">Consensus Info</TabsTrigger>
            <TabsTrigger value="mev">MEV Info</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Card>
              <CardContent className="p-6">
                <div className="grid gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Block Height:</span>
                    <div className="flex items-center">
                      <span>{blockDetails?.height}</span>
                     
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-500">Unfinalized (Safe)</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Timestamp:</span>
                    <span>{blockDetails?.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Proposed On:</span>
                    <span>Block proposed on slot <span className="text-primary">10267660</span>, epoch <span className="text-primary">320864</span></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Transactions:</span>
                    <span><span className="text-primary">{blockDetails?.transactionsCount} transactions</span> in this block</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Previous BlockHash:</span>
                    <span className='text-primary'>{blockDetails?.previousBlockHash && (
                    <>
                      {blockDetails.previousBlockHash.slice(0, 6)}...{blockDetails?.previousBlockHash.slice(-4)}
                    </>
                  )}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">NextBlockHash:</span>
                    <span className='text-primary'>{blockDetails?.nextBlockHash && (
                    <>
                      {blockDetails.nextBlockHash.slice(0, 6)}...{blockDetails?.nextBlockHash.slice(-4)}
                    </>
                  )}</span>
                   
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Block Reward:</span>
                    <span>0.02757567113998184 ETH (+ 0.23673490050295105 - 0.20915922936296925)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Difficulty:</span>
                    <span>{blockDetails?.difficulty}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Size:</span>
                    <span>{blockDetails?.size} bytes</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Confirmations:</span>
                    <span>{blockDetails?.confirmations}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Nonce:</span>
                    <span>{blockDetails?.nonce}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">merkleRoot:</span>
                    <span>{blockDetails?.merkleRoot}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">version</span>
                    <span>{blockDetails?.version}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="consensus">
            {/* Consensus Info content would go here */}
          </TabsContent>
          <TabsContent value="mev">
            {/* MEV Info content would go here */}
          </TabsContent>
        </Tabs>

       
      </main>
    </div>
  )
}