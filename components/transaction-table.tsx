'use client'

import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CopyIcon } from 'lucide-react'

type Transaction = {
  signature: string
  block: number
  age: string
  timestamp: string
  result: 'Success' | 'Failure'
}

const transactions: Transaction[] = [
  {
    signature: '0aHb6btBmEcnGZfnpVSE64wRzpHXBjnLYQeGQFL5MeBvnZd2GMnydwHPFd11...',
    block: 328426271,
    age: 'a month ago',
    timestamp: 'Sep 25, 2024 at 07:19:55 UTC',
    result: 'Success'
  },
  {
    signature: '2jXZtASACrkpTme1Ftw2ShYyZaLXgRPnXdBpssPDcaWKHB4vAePn4SUgxBv4...',
    block: 328283113,
    age: 'a month ago',
    timestamp: 'Sep 24, 2024 at 16:36:28 UTC',
    result: 'Success'
  },
  // Add more transactions here...
]

const colorMap: { [key: string]: string } = {
  '0': 'text-green-400',
  '2': 'text-blue-400',
  '5': 'text-orange-400',
  '3': 'text-purple-400',
  'r': 'text-red-400',
  '4': 'text-yellow-400',
  'E': 'text-pink-400',
}

export function TransactionTableComponent() {
  return (
    <div className="w-full bg-gray-900 p-4 rounded-lg overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-400">TRANSACTION SIGNATURE</TableHead>
            <TableHead className="text-gray-400">BLOCK</TableHead>
            <TableHead className="text-gray-400">AGE</TableHead>
            <TableHead className="text-gray-400">TIMESTAMP</TableHead>
            <TableHead className="text-gray-400">RESULT</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx, index) => (
            <TableRow key={index} className="border-b border-gray-800">
              <TableCell className="font-mono">
                <div className="flex items-center gap-2">
                  <CopyIcon className="h-4 w-4 text-gray-500" />
                  <span className={colorMap[tx.signature[0]] || 'text-gray-300'}>
                    {tx.signature}
                  </span>
                </div>
              </TableCell>
              <TableCell className="font-mono">
                <div className="flex items-center gap-2">
                  <CopyIcon className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-300">{tx.block.toLocaleString()}</span>
                </div>
              </TableCell>
              <TableCell className="text-gray-400">{tx.age}</TableCell>
              <TableCell className="text-gray-400">{tx.timestamp}</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-green-900 text-green-400 border-green-400">
                  {tx.result}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}