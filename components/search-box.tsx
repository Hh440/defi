'use client';

import * as React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { JsonRpcProvider } from 'ethers';
import { TRANSCATION_BLOCKS } from '@/project';
import { useRouter } from 'next/navigation';

export default function SearchBox({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);
  const router= useRouter()
  const provider= new JsonRpcProvider(TRANSCATION_BLOCKS)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue('');
    inputRef.current?.focus();
  };

  const identifyHash = async(hash: string) => {
    // Basic validation for length and hex pattern
    if( /^0x([A-Fa-f0-9]{64})$/.test(hash)){ 
    const id=hash

    const transaction =  await provider.getTransaction(hash);
    const block = await provider.getBlock(hash)
    if(transaction){
      router.push(`/dashboard/transaction/${id}`)

    }
    else if(block){
      router.push(`/dashboard/block/${id}`)
    }

    
   }
  };

  const handleSearch = () => {
    identifyHash(value)
    
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

 

  return (
    <div className={cn("relative", className)} style={{width:"75vw"}}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="pl-9 pr-12 w-full rounded-full bg-muted/50 focus-visible:bg-background transition-colors"
        placeholder="Search for Transaction or Blocks"
      />
      {value && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-10 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          onClick={handleClear}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        onClick={handleSearch}
      >
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </div>
  );
}
