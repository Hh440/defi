'use client'

import { NFTS_API } from "@/project"
import { JsonRpcProvider } from "ethers"
import { useState,useEffect } from "react"
import { useAccount } from "wagmi"

interface NFTTraits{
    trait_type:string,
    value:string|number
}
interface NFT{
    name:string,
    collectionTokenId:string,
    collectionName:string,
    traits:NFTTraits[],
    imageUrl:string,
    chain:string,
    network:string,
    description:string

}

interface FetchNFTsResponse {
    assets: NFT[];
    totalPages: number;
  }

  interface PNftsProps{
    address:string
  }
const PNfts=({address}:PNftsProps)=>{

    const [nfts, setNfts] = useState<NFT[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
 

    useEffect(()=>{

        const fetchNft=async()=>{
          

            try{
    
                const provider= new JsonRpcProvider(NFTS_API)
    
                const response:FetchNFTsResponse = await provider.send("qn_fetchNFTs",[
                    {
                        wallet:address,
                        page:pageNumber,
                        perpage:10 
                    }

                ])

                console.log(response.assets)
    
    
                if(response){
                    setNfts(response.assets||[])
                    setTotalPages(response.totalPages)
                }
    
            }catch(error){
                console.log("Error while fetching NFTs: ",error)
            }
    
        }
        fetchNft()
    },[pageNumber])

    return(
        <div className="flex flex-col items-center py-10 bg-gradient-to-b from-purple-600 to-indigo-900 min-h-screen text-white">
      <h1 className="text-4xl font-extrabold mb-8 text-center">Explore Your NFT Collection</h1>
      
      {nfts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-20">
          {nfts.map((nft, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-10 shadow-lg rounded-xl p-6 transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <img
                src={nft.imageUrl}
                alt={nft.name}
                className="w-full h-60 object-cover rounded-lg mb-4 transition-transform duration-300 hover:scale-110"
              />
              <h2 className="text-2xl font-semibold mb-2 text-center text-purple-200">{nft.name}</h2>
              <p className="text-gray-200 text-sm mb-2 text-center italic">{nft.collectionName}</p>
              <p className="text-gray-300 mb-2 text-sm text-center">{nft.description}</p>
              <div className="text-gray-300 mb-3">
                <strong className="text-purple-300">Traits:</strong>
                <ul className="list-disc ml-5 mt-2 text-gray-200">
                  {nft.traits.map((trait, idx) => (
                    <li key={idx} className="text-xs">
                      <strong>{trait.trait_type}:</strong> {trait.value}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-between mt-4">
                <p className="text-xs text-purple-300"><strong>Chain:</strong> {nft.chain}</p>
                <p className="text-xs text-purple-300"><strong>Network:</strong> {nft.network}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-200 mt-10">No NFTs found for this wallet.</p>
      )}

      <div className="flex items-center mt-12 space-x-4">
        <button
          onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
          disabled={pageNumber === 1}
          className="px-5 py-2 bg-purple-500 hover:bg-purple-700 rounded-full text-white disabled:bg-gray-500"
        >
          Previous
        </button>
        <span className="text-white text-lg">
          Page {pageNumber} of {totalPages}
        </span>
        <button
          onClick={() => setPageNumber((prev) => Math.min(prev + 1, totalPages))}
          disabled={pageNumber === totalPages}
          className="px-5 py-2 bg-purple-500 hover:bg-purple-700 rounded-full text-white disabled:bg-gray-500"
        >
          Next
        </button>
      </div>
    </div>
    
    )
}

export default PNfts