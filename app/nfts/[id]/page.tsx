'use client'
import { useSearchParams } from 'next/navigation';
import { useParams, useRouter } from "next/navigation";
import NftDisplay from '@/components/Nfts';

const Nfts = () => {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id; 
    const searchParams = useSearchParams();
    const name = searchParams.get('name'); 

    return (
        <div style={{ width: '75vw' }}>
            {id && <NftDisplay id={id} name={name}/>}
        </div>
    );
}

export default Nfts;
