import TransactionDetails from "@/components/transaction-details";

export default function Table() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-md">
        <TransactionDetails />
      </div>
    </div>
  );
}
