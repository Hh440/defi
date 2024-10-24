'use client'

import { useParams, useSearchParams } from "next/navigation";
import NftDetail from "@/components/NftDetail";

const Nftdetail=()=>{

    const params= useParams()
    const tokenId=  params.tokenId as string
    const searchParams =useSearchParams()
    const collection = searchParams.get('collection') || '';
    return(
        <div style={{width:'75vw'}}>

            <NftDetail tokenId={tokenId}  collection={collection} />
        </div>
    )
}

export default Nftdetail