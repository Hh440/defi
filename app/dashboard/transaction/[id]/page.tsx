'use client'
import TransactionDetails from "@/components/transaction-details";
import { useParams } from "next/navigation";

export default function Transaction() {

  const params= useParams()
  const id=  params.id as string



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100" style={{width:"75vw"}}>
      <div className="p-6 bg-white shadow-md rounded-md">
        <TransactionDetails txId={id}/>
      </div>
    </div>
  );
}
