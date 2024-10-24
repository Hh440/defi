'use client'

import { useEffect, useState } from "react";
import { JsonRpcProvider } from "ethers";

interface NftDetailProps {
    tokenId: string,
    collection: string
}

interface Nft {
    name: string;
    description: string;
    imageUrl: string;
    collectionTokenId: string;
    traits: Array<{ trait_type: string; value: string }>;
}

interface Transfer {
    from: string;
    to: string;
    date: string;
    transactionHash: string;
}

interface FetchTransferProps {
    id: string,
    page: number
}

const NftDetail = ({ tokenId, collection }: NftDetailProps) => {
    const [nft, setNft] = useState<Nft | null>(null);
    const [transfers, setTransfer] = useState<Transfer[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchNftDetails(tokenId);
        fetchNftTransfer(tokenId, currentPage);
    }, [tokenId, currentPage]);

    const fetchNftDetails = async (id: string) => {
        try {
            const provider = new JsonRpcProvider("https://magical-ancient-thunder.quiknode.pro/1dfd76532b6aae1a1d30282878363ef524d5bf69/");
            const data = await provider.send("qn_fetchNFTsByCollection", [
                { collection, tokenId: id }
            ]);

            if (data.tokens && data.tokens.length > 0) {
                const nftData = data.tokens[tokenId];

                const formattedNft: Nft = {
                    name: nftData.name || `Token #${nftData.tokenId}`,
                    description: nftData.description || "No description available",
                    imageUrl: nftData.imageUrl || "",
                    collectionTokenId: nftData.tokenId,
                    traits: nftData.traits || [],
                };
                setNft(formattedNft);
            } else {
                console.log("No NFT found for the given tokenId");
            }
        } catch (error) {
            console.error("Error fetching NFT details:", error);
        }
    };

    const fetchNftTransfer = async (id: string, page: number) => {
        try {
            const provider = new JsonRpcProvider("https://magical-ancient-thunder.quiknode.pro/1dfd76532b6aae1a1d30282878363ef524d5bf69/");
            const data = await provider.send("qn_getTransfersByNFT", [
                {
                    collection,
                    collectionTokenId: id,
                    page,
                    perpage: 40
                }
            ]);

            if (data.transfers && Array.isArray(data.transfers)) {
                const formattedTransfers = data.transfers.map((transfer: any) => ({
                    from: transfer.from,
                    to: transfer.to,
                    date: new Date(transfer.date).toLocaleString(),
                    transactionHash: transfer.transactionHash,
                }));
                setTransfer(formattedTransfers);
                setTotalPages(data.totalPages || 1);
            }
        } catch (error) {
            console.error("Error fetching transfer history:", error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-200 to-blue-100 p-8">
            {nft && (
                <div className="flex flex-col items-center space-y-6">
                    <div className="flex flex-col items-center text-center">
                        {nft.imageUrl ? (
                            <img 
                                src={nft.imageUrl} 
                                alt={nft.name} 
                                className="w-48 h-48 object-cover rounded-full shadow-lg transition-transform duration-300 transform hover:scale-110" 
                            />
                        ) : (
                            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
                                <span role="img" aria-label="placeholder" className="text-gray-400 text-4xl">🔮</span>
                            </div>
                        )}
                        <h2 className="text-4xl font-extrabold text-blue-700 mt-4 transition-colors duration-300 hover:text-blue-500">{nft.name}</h2>
                        <p className="text-gray-600 text-lg mt-2">{nft.description}</p>
                    </div>

                    <div className="w-full">
                        <h3 className="text-2xl font-semibold text-blue-600 mb-2 text-center">Traits:</h3>
                        <ul className="grid grid-cols-2 gap-4">
                            {nft.traits.map((trait, idx) => (
                                <li 
                                    key={idx} 
                                    className="text-sm bg-blue-100 rounded-lg px-4 py-2 text-blue-700 shadow transition-shadow duration-300 hover:shadow-lg"
                                >
                                    <strong>{trait.trait_type}:</strong> {trait.value}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="w-full">
                        <h3 className="text-2xl font-semibold text-blue-600 mb-2 text-center">Transfer History:</h3>
                        <ul className="space-y-3">
                            {transfers.length > 0 ? (
                                transfers.map((transfer, idx) => (
                                    <li key={idx} className="text-sm bg-gray-100 p-4 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg mx-4" style={{width: '65vw', maxWidth: '600px'}}>
                                        <strong className="text-gray-700">From:</strong> {transfer.from} <br />
                                        <strong className="text-gray-700">To:</strong> {transfer.to} <br />
                                        <strong className="text-gray-700">Date:</strong> {transfer.date} <br />
                                        <strong className="text-blue-500">
                                            <a
                                                href={`https://etherscan.io/tx/${transfer.transactionHash}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="underline"
                                            >
                                                View on Etherscan
                                            </a>
                                        </strong>
                                    </li>
                                ))
                            ) : (
                                <p className="text-gray-500">No transfers found for this NFT.</p>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NftDetail;
