'use client'

import { Card, CardContent } from "@/components/ui/card"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import { QrCode } from "lucide-react"
import { useEffect, useState } from "react"

const  WalletBalance=()=> {
  const solBalance = 42.69 // This would typically come from a state or prop
  const walletAddress = "7KBVh...X2Uf3"


  
  const wallet = useWallet()
  const {connection}= useConnection()

  const [balance,setBalance]=useState(0)


  useEffect(()=>{
   const getBalance=async()=>{
    if(!wallet.publicKey){
      setBalance(0)
      return
    }


    const balance= await connection.getBalance(wallet.publicKey)

    setBalance(balance/LAMPORTS_PER_SOL)


   }

   getBalance()
  },[wallet.publicKey,connection])


  const maskPublicKey = (key: string) => {
    return `${key.slice(0, 4)} ${key.slice(4, 8)} ${key.slice(-5, -1)}`
  }


  if(!wallet.publicKey){
    return<div>
      Not connected
    </div>
  }



  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md aspect-[1.6/1] relative overflow-hidden bg-gradient-to-br from-primary to-primary-foreground border-2 opacity-90">
        <CardContent className="relative h-full flex flex-col justify-between p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-300">Solana Balance</h2>
              <p className="text-4xl font-extrabold text-white mt-2">
                {balance.toFixed(4)} SOL
              </p>
            </div>
            <div className="bg-gray-700 rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 397.7 311.7"
                className="w-10 h-10"
              >
                <path
                  d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z"
                  fill="#00FFA3"
                />
                <path
                  d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z"
                  fill="#00FFA3"
                />
                <path
                  d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z"
                  fill="#00FFA3"
                />
              </svg>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-gray-800 text-xs">Wallet Address</p>
                <p className="text-gray-200 text-sm font-medium">{maskPublicKey(wallet.publicKey.toString())}</p>
              </div>
              <div className="bg-gray-700 p-2 rounded">
                <QrCode className="w-8 h-8 text-gray-300" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default WalletBalance