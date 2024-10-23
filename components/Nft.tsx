'use client'
import { JsonRpcProvider } from 'ethers'

import { useEffect, useState } from 'react'


interface NFT {
    name: string;
    description: string;
    imageUrl?: string;
    totalSupply: number; 
    volume: number;
  }

const Nft=()=>{

    const [nftCollection,setNftCollections]= useState<NFT[]>([])



    useEffect(()=>{
        const fetchNftCollections=async()=>{
            try{

                const provider= new JsonRpcProvider("https://magical-ancient-thunder.quiknode.pro/1dfd76532b6aae1a1d30282878363ef524d5bf69/")

                const nftData = await provider.send("qn_fetchNFTCollectionDetails", [
                    {
                      contracts: [
                        "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
                        "0xbd3531da5cf5857e7cfaa92426877b022e612cf8",
                        "0x5af0d9827e0c53e4799bb226655a1de152a425a5",
                        "0x7e72abdf47bd21bf0ed6ea8cb8dad60579f3fb50",
                        "0x60e4d786628fea6478f785a6d7e704777c86a7c6",
                        "0x524cab2ec69124574082676e6f654a18df49a048"
                      ]
                    }
                  ]);


                  console.log("NFT Data:", nftData); // Log the full response

                // Assuming nftData is an array of NFTs
                const uniqueNfts = Array.from(new Map(nftData.map((nft: NFT) => [nft.name, nft])).values());
                

                  setNftCollections(nftData)

            }catch(error){
                console.log("Error is ",error)
            }
        }


        fetchNftCollections()
    },[])


    return(
        <div className="p-6 bg-gray-100">
        <h1 className="text-3xl font-bold text-center mb-8">NFT Collection</h1>
        <div className="grid grid-cols-1 gap-6">
            {nftCollection.map((nft: NFT, index) => (
                <div key={index} className="flex items-center justify-between bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center">
                        {nft.imageUrl && (
                            <img src={nft.imageUrl} alt={nft.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                        )}
                        <div>
                            <h2 className="text-xl font-semibold">{nft.name}</h2>
                            <p className="text-gray-600">{nft.description}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-500">Supply: {nft.totalSupply}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>  
    
    )
}

export default Nft