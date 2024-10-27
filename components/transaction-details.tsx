import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CopyIcon, InfoIcon, RefreshCw, Search } from 'lucide-react'

type TransactionDetailsProps = {
  signature: string
  result: 'Success' | 'Failure'
  timestamp: string
  confirmationStatus: string
  confirmations: string
  slot: number
  recentBlockhash: string
  fee: number
  computeUnitsConsumed: number
  transactionVersion: string
}

export default function TransactionDetails({
  signature = "QaHb6btBmEcnGZfnpVSE64wRzpHXBjnLYQeGQfL5MeBvnZd2GMnydwHPFd115mD8HsrHcTxDCTJzkprZ5J2yW5Q",
  result = "Success",
  timestamp = "Sep 25, 2024 at 12:49:55 India Standard Time",
  confirmationStatus = "FINALIZED",
  confirmations = "MAX",
  slot = 328426271,
  recentBlockhash = "8MtewL9MQ96p68o376YYpiaxU7QPvJ5JZGio1d8nzwvC",
  fee = 0.00001,
  computeUnitsConsumed = 2977,
  transactionVersion = "LEGACY"
}: TransactionDetailsProps) {
  return (
    <div className="w-full max-w-4xl p-4 bg-gray-900 text-gray-100">
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
            <Button variant="outline" size="sm" className="text-gray-300 border-gray-600">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-[1fr,auto] items-center gap-2">
            <span className="text-gray-400">Signature</span>
            <div className="flex items-center gap-2 font-mono text-sm">
              <span className="truncate max-w-[300px]">{signature}</span>
              <CopyIcon className="h-4 w-4 text-gray-500 cursor-pointer" />
            </div>
          </div>
          <div className="grid grid-cols-[1fr,auto] items-center gap-2">
            <span className="text-gray-400">Result</span>
            <Badge variant="outline" className="bg-green-900 text-green-400 border-green-400">
              {result}
            </Badge>
          </div>
          <div className="grid grid-cols-[1fr,auto] items-center gap-2">
            <span className="text-gray-400">Timestamp</span>
            <span>{timestamp}</span>
          </div>
          <div className="grid grid-cols-[1fr,auto] items-center gap-2">
            <span className="text-gray-400">Confirmation Status</span>
            <span>{confirmationStatus}</span>
          </div>
          <div className="grid grid-cols-[1fr,auto] items-center gap-2">
            <span className="text-gray-400">Confirmations</span>
            <span>{confirmations}</span>
          </div>
          <div className="grid grid-cols-[1fr,auto] items-center gap-2">
            <span className="text-gray-400">Slot</span>
            <div className="flex items-center gap-2 font-mono">
              <span>{slot.toLocaleString()}</span>
              <CopyIcon className="h-4 w-4 text-gray-500 cursor-pointer" />
            </div>
          </div>
          <div className="grid grid-cols-[1fr,auto] items-center gap-2">
            <span className="text-gray-400">Recent Blockhash</span>
            <div className="flex items-center gap-2">
              <span className="font-mono">{recentBlockhash}</span>
              <InfoIcon className="h-4 w-4 text-gray-500" />
            </div>
          </div>
          <div className="grid grid-cols-[1fr,auto] items-center gap-2">
            <span className="text-gray-400">Fee (SOL)</span>
            <span className="font-mono">◎{fee.toFixed(5)}</span>
          </div>
          <div className="grid grid-cols-[1fr,auto] items-center gap-2">
            <span className="text-gray-400">Compute units consumed</span>
            <span>{computeUnitsConsumed.toLocaleString()}</span>
          </div>
          <div className="grid grid-cols-[1fr,auto] items-center gap-2">
            <span className="text-gray-400">Transaction Version</span>
            <span>{transactionVersion}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}