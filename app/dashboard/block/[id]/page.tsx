'use client'
import BlockExplorer from "@/components/block-explorer"
import { useParams } from "next/navigation"

export default function Block() {

    const params= useParams()
    const id = params.id as string
    return (
        <div style={{width:"75vw"}}>
            <BlockExplorer blockHash={id}/>
        </div>
    )
}