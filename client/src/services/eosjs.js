import { JsonRpc } from 'eosjs';

export const EOS_NETWORK = {
  blockchain: "eos",
  protocol: "https",
  host: "jungle2.cryptolions.io",
  port: 443,
  chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473" 
};

export const EOS_RPC_URL = EOS_NETWORK.protocol+"://"+EOS_NETWORK.host+":"+EOS_NETWORK.port
export const rpc = new JsonRpc(EOS_RPC_URL);
