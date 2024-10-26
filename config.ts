import { http, createConfig } from 'wagmi'
import { mainnet,} from 'wagmi/chains'
import { injected, safe} from 'wagmi/connectors'



const config = createConfig({
  chains: [mainnet],
  connectors:[
    injected(),
    safe()

  ],
  
  transports: {
    [mainnet.id]: http(),
    
  },
})

export default  config

