import TransactionDetails from "@/components/transaction-details";
import { useEffect } from "react";

export default function Transaction() {

  



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100" style={{width:"75vw"}}>
      <div className="p-6 bg-white shadow-md rounded-md">
        <TransactionDetails txId="0xd5ab71b461328b84ade881cdb8fb923ba9254abf5e290f8f7b3299082fb5218f"/>
      </div>
    </div>
  );
}
