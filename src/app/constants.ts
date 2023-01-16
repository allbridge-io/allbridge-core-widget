import {environment} from "../environments/environment";
import {ChainSymbol} from "./models/chains.model";
import {Chain} from "./services/chains/constants";
import {checkAndAddSlashToTheEnd} from "./utlis";


export const API_URL = checkAndAddSlashToTheEnd(environment.api);

export const SYSTEM_PRECISION = 3;

export const CHAIN_MAP: Map<ChainSymbol, Chain> = new Map();
environment.CHAIN_LIST.forEach(chainConf => {
  CHAIN_MAP.set(chainConf.chainSymbol, new Chain(chainConf));
});


