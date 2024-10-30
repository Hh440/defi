import { useState } from 'react'
import { motion } from 'framer-motion'
import { Wallet, AlertCircle, Zap } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

export default function WalletNotConnected() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <Card className="w-full max-w-md overflow-hidden">
        <CardContent className="p-0">
          <motion.div
            className="relative bg-gradient-to-br from-primary/10 to-primary/5 p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 18,
                ease: "linear",
                repeat: Infinity,
              }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full -ml-12 -mb-12"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, -90, 0],
              }}
              transition={{
                duration: 15,
                ease: "linear",
                repeat: Infinity,
              }}
            />
            <motion.div
              className="relative z-10 flex flex-col items-center text-center"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className="relative"
              >
                <Wallet 
                  size={80} 
                  className={`mb-6 ${isHovered ? 'text-primary' : 'text-gray-400'} transition-colors duration-300`}
                />
                <motion.div
                  className="absolute -top-1 -right-1 bg-primary rounded-full p-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: isHovered ? 1 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Zap size={16} className="text-white" />
                </motion.div>
              </motion.div>
              <h2 className="text-3xl font-bold mb-3 text-gray-800">Wallet Not Connected</h2>
              <p className="text-gray-600 mb-6">
                Connect your wallet to unlock a world of digital possibilities.
              </p>
              <div className="flex items-center justify-center space-x-2 text-amber-500 text-sm bg-amber-50 px-4 py-2 rounded-full">
                <AlertCircle size={16} />
                <span>Ensure your wallet is unlocked</span>
              </div>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  )
}