'use client'

import { useState, useEffect } from 'react'
import { Connector, useConnect } from 'wagmi'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet } from 'lucide-react'

function WalletNotConnected() {
  return (
    <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg shadow-inner">
      <Wallet className="w-16 h-16 mx-auto mb-4 text-primary" />
      <h2 className="text-2xl font-bold text-primary mb-2">Connect Your Wallet</h2>
      <p className="text-sm text-muted-foreground max-w-xs mx-auto">
        Choose a wallet to connect and start exploring the world of decentralized finance.
      </p>
    </div>
  )
}

export default function Component() {
  const [isMounted, setIsMounted] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const { connectors, connect, isSuccess } = useConnect()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isSuccess) {
      setIsConnected(true)
    }
  }, [isSuccess])

  if (!isMounted) return null
  if (!connectors.length) return <div>No connectors available</div>

  const handleConnect = async (connector: Connector) => {
    console.log(`Attempting to connect with ${connector.name} (id: ${connector.id})`)
    try {
      await connect({ connector })
      console.log(`Successfully connected with ${connector.name}`)
    } catch (error) {
      console.error(`Connection failed with ${connector.name}:`, error)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Wallet Connection</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isConnected && <WalletNotConnected />}
        <div className="grid grid-cols-2 gap-3 mt-6">
          {connectors.map((connector) => (
            <Button
              key={connector.id}
              onClick={() => handleConnect(connector)}
              variant="outline"
              className="w-full"
            >
              {connector.name}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}