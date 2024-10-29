import { CopyIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type OverviewProps = {
  address: string
  balance: number
  allocatedDataSize: number
  assignedProgramId: string
  executable: boolean
}

export default function WalletOverview({
  address = "9J569tVBvFCsUGnKwKRp6t5zcnUezAYMRb3cz6oC4rtd",
  balance = 72.9969818,
  allocatedDataSize = 0,
  assignedProgramId = "System Program",
  executable = false
}: OverviewProps) {
  return (
    <Card className="w-full max-w-3xl bg-gray-900 text-gray-100">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-[1fr,auto] items-center gap-2">
          <span className="text-gray-400">Address</span>
          <div className="flex items-center gap-2 font-mono">
            <span>{address}</span>
            <CopyIcon className="h-4 w-4 text-gray-500 cursor-pointer" />
          </div>
        </div>
        <div className="grid grid-cols-[1fr,auto] items-center gap-2">
          <span className="text-gray-400">Balance (SOL)</span>
          <span className="font-mono">{balance.toFixed(7)}</span>
        </div>
        <div className="grid grid-cols-[1fr,auto] items-center gap-2">
          <span className="text-gray-400">Allocated Data Size</span>
          <span>{allocatedDataSize} byte(s)</span>
        </div>
        <div className="grid grid-cols-[1fr,auto] items-center gap-2">
          <span className="text-gray-400">Assigned Program Id</span>
          <div className="flex items-center gap-2">
            <span className="text-green-400">{assignedProgramId}</span>
            <CopyIcon className="h-4 w-4 text-gray-500 cursor-pointer" />
          </div>
        </div>
        <div className="grid grid-cols-[1fr,auto] items-center gap-2">
          <span className="text-gray-400">Executable</span>
          <span>{executable ? "Yes" : "No"}</span>
        </div>
      </CardContent>
    </Card>
  )
}