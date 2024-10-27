import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowRight, ChevronDown, Copy, ExternalLink, Info, Search, Settings } from 'lucide-react'

export default function BlockExplorer() {
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
          <h1 className="text-2xl font-bold mb-2">Block #21057282</h1>
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
                      <span>21057282</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6"><ArrowLeft className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6"><ArrowRight className="h-4 w-4" /></Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-500">Unfinalized (Safe)</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Timestamp:</span>
                    <span>14 mins ago (Oct-27-2024 01:32:23 PM +UTC)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Proposed On:</span>
                    <span>Block proposed on slot <span className="text-primary">10267660</span>, epoch <span className="text-primary">320864</span></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Transactions:</span>
                    <span><span className="text-primary">173 transactions</span> and <span className="text-primary">87 contract internal transactions</span> in this block</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Withdrawals:</span>
                    <span><span className="text-primary">16 withdrawals</span> in this block</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Fee Recipient:</span>
                    <div className="flex items-center">
                      <span className="text-primary">beaverbuild</span>
                      <Copy className="h-4 w-4 ml-2 text-muted-foreground cursor-pointer hover:text-foreground" />
                      <span className="ml-2 text-muted-foreground">in 12 secs</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Block Reward:</span>
                    <span>0.02757567113998184 ETH (+ 0.23673490050295105 - 0.20915922936296925)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Difficulty:</span>
                    <span>58,750,003,716,598,352,816,469</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Size:</span>
                    <span>96,024 bytes</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Gas Used:</span>
                    <div className="flex items-center space-x-2">
                      <span>23,176,102 (77.25%)</span>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{width: '77.25%'}}></div>
                      </div>
                      <span className="text-green-600 dark:text-green-400">+55% Gas Target</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Gas Limit:</span>
                    <span>30,000,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Base Fee Per Gas:</span>
                    <span>0.000000009024780326 ETH (9.024780326 Gwei)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Burnt Fees:</span>
                    <span>🔥 0.20915922936296925 ETH</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Extra Data:</span>
                    <span>beaverbuild.org (Hex:0x62656176657262756...)</span>
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

        <div className="mt-4 text-primary">
          <a href="#" className="flex items-center hover:underline">
            <span>Click to see more</span>
            <ChevronDown className="h-4 w-4 ml-1" />
          </a>
        </div>
      </main>
    </div>
  )
}