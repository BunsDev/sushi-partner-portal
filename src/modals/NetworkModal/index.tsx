import { ChainId } from "@sushiswap/core-sdk";
import HeadlessUiModal from "app/components/Modal/HeadlessUIModal";
import { NETWORK_ICON, NETWORK_LABEL } from "app/config/networks";
import { classNames } from "app/functions";
import { useActiveWeb3React } from "app/services/web3";
import { ApplicationModal } from "app/state/application/actions";
import {
  useModalOpen,
  useNetworkModalToggle,
} from "app/state/application/hooks";
// @ts-ignore TYPE NEEDS FIXING
import cookie from "cookie-cutter";
import Image from "next/image";
import React, { FC } from "react";

export const SUPPORTED_NETWORKS: {
  [chainId in ChainId]?: {
    chainId: string;
    chainName: string;
    nativeCurrency: {
      name: string;
      symbol: string;
      decimals: number;
    };
    rpcUrls: string[];
    blockExplorerUrls: string[];
  };
} = {
  [ChainId.ETHEREUM]: {
    chainId: "0x1",
    chainName: "Ethereum",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://api.sushirelay.com/v1"],
    blockExplorerUrls: ["https://etherscan.com"],
  },
  [ChainId.FANTOM]: {
    chainId: "0xfa",
    chainName: "Fantom",
    nativeCurrency: {
      name: "Fantom",
      symbol: "FTM",
      decimals: 18,
    },
    rpcUrls: ["https://rpcapi.fantom.network"],
    blockExplorerUrls: ["https://ftmscan.com"],
  },
  [ChainId.BSC]: {
    chainId: "0x38",
    chainName: "Binance Smart Chain",
    nativeCurrency: {
      name: "Binance Coin",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://bsc-dataseed.binance.org"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  [ChainId.MATIC]: {
    chainId: "0x89",
    chainName: "Matic",
    nativeCurrency: {
      name: "Matic",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://polygon-rpc.com"], // ['https://matic-mainnet.chainstacklabs.com/'],
    blockExplorerUrls: ["https://polygonscan.com"],
  },
  [ChainId.HECO]: {
    chainId: "0x80",
    chainName: "Heco",
    nativeCurrency: {
      name: "Heco Token",
      symbol: "HT",
      decimals: 18,
    },
    rpcUrls: ["https://http-mainnet.hecochain.com"],
    blockExplorerUrls: ["https://hecoinfo.com"],
  },
  [ChainId.XDAI]: {
    chainId: "0x64",
    chainName: "xDai",
    nativeCurrency: {
      name: "xDai Token",
      symbol: "xDai",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.xdaichain.com"],
    blockExplorerUrls: ["https://blockscout.com/poa/xdai"],
  },
  [ChainId.HARMONY]: {
    chainId: "0x63564C40",
    chainName: "Harmony",
    nativeCurrency: {
      name: "One Token",
      symbol: "ONE",
      decimals: 18,
    },
    rpcUrls: [
      "https://api.harmony.one",
      "https://s1.api.harmony.one",
      "https://s2.api.harmony.one",
      "https://s3.api.harmony.one",
    ],
    blockExplorerUrls: ["https://explorer.harmony.one/"],
  },
  [ChainId.AVALANCHE]: {
    chainId: "0xA86A",
    chainName: "Avalanche Mainnet C-Chain",
    nativeCurrency: {
      name: "Avalanche Token",
      symbol: "AVAX",
      decimals: 18,
    },
    rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
    blockExplorerUrls: ["https://snowtrace.io"],
  },
  [ChainId.OKEX]: {
    chainId: "0x42",
    chainName: "OKEx",
    nativeCurrency: {
      name: "OKEx Token",
      symbol: "OKT",
      decimals: 18,
    },
    rpcUrls: ["https://exchainrpc.okex.org"],
    blockExplorerUrls: ["https://www.oklink.com/okexchain"],
  },
  [ChainId.ARBITRUM]: {
    chainId: "0xA4B1",
    chainName: "Arbitrum",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://arb1.arbitrum.io/rpc"],
    blockExplorerUrls: ["https://arbiscan.io"],
  },
  [ChainId.CELO]: {
    chainId: "0xA4EC",
    chainName: "Celo",
    nativeCurrency: {
      name: "Celo",
      symbol: "CELO",
      decimals: 18,
    },
    rpcUrls: ["https://forno.celo.org"],
    blockExplorerUrls: ["https://explorer.celo.org"],
  },
  [ChainId.MOONRIVER]: {
    chainId: "0x505",
    chainName: "Moonriver",
    nativeCurrency: {
      name: "Moonriver",
      symbol: "MOVR",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.moonriver.moonbeam.network"],
    blockExplorerUrls: ["https://moonriver.moonscan.io"],
  },
  [ChainId.FUSE]: {
    chainId: "0x7A",
    chainName: "Fuse",
    nativeCurrency: {
      name: "Fuse",
      symbol: "FUSE",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.fuse.io"],
    blockExplorerUrls: ["https://explorer.fuse.io"],
  },
  [ChainId.TELOS]: {
    chainId: "0x28",
    chainName: "Telos",
    nativeCurrency: {
      name: "Telos",
      symbol: "TLOS",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.telos.net/evm"],
    blockExplorerUrls: ["https://rpc1.us.telos.net/v2/explore"],
  },
  [ChainId.PALM]: {
    chainId: "0x2A15C308D",
    chainName: "Palm",
    nativeCurrency: {
      name: "Palm",
      symbol: "PALM",
      decimals: 18,
    },
    rpcUrls: [
      "https://palm-mainnet.infura.io/v3/da5fbfafcca14b109e2665290681e267",
    ],
    blockExplorerUrls: ["https://explorer.palm.io"],
  },
};

const NetworkModal = ({ chainId, setChainId }) => {
  const networkModalOpen = useModalOpen(ApplicationModal.NETWORK);
  const toggleNetworkModal = useNetworkModalToggle();

  //if (!chainId) return null;

  return (
    <HeadlessUiModal.Controlled
      isOpen={networkModalOpen}
      onDismiss={toggleNetworkModal}
    >
      <div className="flex flex-col gap-4">
        <HeadlessUiModal.Header
          header="Select a network"
          onClose={toggleNetworkModal}
        />
        <div className="grid grid-flow-row-dense grid-cols-1 gap-4 overflow-y-auto md:grid-cols-2">
          {[
            ChainId.ETHEREUM,
            ChainId.MATIC,
            ChainId.ARBITRUM,
            ChainId.AVALANCHE,
            ChainId.MOONRIVER,
            ChainId.FANTOM,
            ChainId.BSC,
            ChainId.XDAI,
            ChainId.HARMONY,
            ChainId.TELOS,
            ChainId.CELO,
            ChainId.FUSE,
            ChainId.OKEX,
            ChainId.HECO,
            ChainId.PALM,
          ].map((key: ChainId, i: number) => {
            if (chainId === key) {
              return (
                <div
                  key={i}
                  className="bg-[rgba(0,0,0,0.2)] focus:outline-none flex items-center gap-4 w-full px-4 py-3 rounded border border-purple cursor-default"
                >
                  <Image
                    // @ts-ignore TYPE NEEDS FIXING
                    src={NETWORK_ICON[key]}
                    alt="Switch Network"
                    className="rounded-md"
                    width="32px"
                    height="32px"
                  />
                  <div className="font-bold text-high-emphesis">
                    {NETWORK_LABEL[key]}
                  </div>
                </div>
              );
            }
            return (
              <button
                key={i}
                onClick={async () => {
                  console.debug(
                    `Switching to chain ${key}`,
                    SUPPORTED_NETWORKS[key]
                  );
                  toggleNetworkModal();
                  const params = SUPPORTED_NETWORKS[key];
                  cookie.set("chainId", key, params);

                  setChainId(key);
                }}
                className={classNames(
                  "bg-[rgba(0,0,0,0.2)] focus:outline-none flex items-center gap-4 w-full px-4 py-3 rounded border border-dark-700 hover:border-blue"
                )}
              >
                {/*@ts-ignore TYPE NEEDS FIXING*/}
                <Image
                  src={NETWORK_ICON[key]}
                  alt="Switch Network"
                  className="rounded-md"
                  width="32px"
                  height="32px"
                />
                <div className="font-bold text-high-emphesis">
                  {NETWORK_LABEL[key]}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </HeadlessUiModal.Controlled>
  );
};

export default NetworkModal;
