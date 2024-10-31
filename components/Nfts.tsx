'use client'

import { useEffect, useState } from "react";
import { JsonRpcProvider } from "ethers";
import Link from "next/link";
import { NFTS_API } from "@/project";

interface NftDisplayProps {
    id: string;
    name:string
}

interface Nft {
    name: string;
    description: string;
    imageUrl: string;
    tokenId: string;
    traits: Array<{ trait_type: string; value: string }>;
    collectionTokenId:string
}




const NftDisplay = ({id,name}:NftDisplayProps) => {
    const [nfts, setNfts] = useState<Nft[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    

    const fetchNfts = async (page: number) => {
        try {
            const provider = new JsonRpcProvider(NFTS_API);
            const data = await provider.send("qn_fetchNFTsByCollection", [
                {
                    collection: id,
                    page,
                    perPage: 40, 
                }
            ]);

            console.log("Fetched data:", data);


            console.log("TOkens: ",data.tokens)
            
            if (data.tokens && Array.isArray(data.tokens)) {
                const formattedNfts = data.tokens.map((nft: Nft) => {
                    // Log each NFT to see its structure
                    console.log("NFT Object:", nft);

                    return {
                        name: nft.name || `Token #${nft.collectionTokenId}`,
                        description: nft.description || "No description available",
                        imageUrl: nft.imageUrl || "",
                        collectionTokenId: nft.collectionTokenId, // Ensure tokenId is correctly mapped
                        traits: nft.traits || [],
                    };
                });
                setNfts(formattedNfts);
                setTotalPages(data.totalPages || 1);
            } else {
                console.error("Expected an array of tokens but received:", data.tokens);
            }
        } catch (error) {
            console.log("Error while fetching NFTs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNfts(currentPage);
    }, [currentPage]);

    if (loading) {
        return <div className="text-center">Loading NFTs...</div>;
    }

    return (
        <div className="p-6 bg-gray-100">
            <h1 className="text-3xl font-bold text-center mb-8">{name} NFTs</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {nfts.map((nft) => {
                    const tokenId=nft.collectionTokenId

                    console.log(tokenId)
                    
                    
                    return(

                    <Link href={`/nftdetail/${tokenId}?collection=${encodeURIComponent(id)}`} passHref key={tokenId} >
                    <div key={nft.tokenId} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex flex-col items-center">
                            {nft.imageUrl ? (
                                <img src={nft.imageUrl} alt={nft.name} className="w-full h-full object-cover rounded-md mb-4" />
                            ) : (
                                <div className="w-32 h-32 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                                    <span role="img" aria-label="placeholder" className="text-gray-400 text-3xl">🔮</span>
                                </div>
                            )}
                            <h2 className="text-xl font-semibold">{nft.name}</h2>
                            <p className="text-gray-600 mb-4 text-center">{nft.description}</p>
                            <div className="w-full">
                                <h3 className="text-lg font-medium mb-2">Traits:</h3>
                                <ul className="space-y-1">
                                    {nft.traits.map((trait, idx) => (
                                        <li key={idx} className="text-sm text-gray-500">
                                            <strong>{trait.trait_type}: </strong>
                                            {trait.value}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    </Link>
                )})}
            </div>
            
            <div className="flex justify-center mt-6">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="mx-4">Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default NftDisplay;
