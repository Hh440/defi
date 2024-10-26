'use clie'

import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';

const Account = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });
  
  // Placeholder image if there is no ENS Avatar
 
  return (
    <div className=" bg-gray-800 text-white rounded-xl shadow-xl mr-64 space-y-4 text-center  flex flex-col items-center justify-center" style={{height:"30vw"}}>
      <img
        alt="ENS Avatar"
        src={ensAvatar || "/media/custom_avatar.jpeg"}
        className="w-24 h-24 rounded-full border-4 border-gray-700"
      />
      <div className="space-y-2 mt-4">
        {address && (
          <div className="text-lg font-semibold break-words px-4">
            {ensName ? `${ensName} (${address})` : address}
          </div>
        )}
        <button
          onClick={() => disconnect()}
          className="bg-red-600 hover:bg-red-500 text-white font-medium py-2 px-6 rounded-lg transition duration-200 mt-4"
        >
          Disconnect
        </button>
      </div>
    </div>
  );
};

export default Account;
