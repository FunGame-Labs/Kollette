"use client";

import {
  useAddress,
  useContract,
  useContractRead,
  useOwnedNFTs,
  Web3Button,
} from "@thirdweb-dev/react";
import { PackRewards } from "@thirdweb-dev/sdk/dist/declarations/src/evm/schema";
import type { FC } from "react";
import { useState } from "react";
import ERC1155RewardBox from "../components/ERC1155RewardBox";
import { PACK_ADDRESS } from "../utils/constants";
import useStore from "../utils/store";

const Chest: FC = () => {
  const address = useAddress();
  const { contract: pack } = useContract(PACK_ADDRESS, "pack");
  const { data: nfts, isLoading } = useOwnedNFTs(pack, address);
  // const [openedPackRewards, setOpenedPackRewards] = useState<PackRewards>();
  const { setOpenedPackRewards } = useStore();

  const { data: chestAmount, isLoading: chestAmountIsLoading } =
    useContractRead(pack, "balanceOf", address, 0);
  console.log(
    "🚀 ~ file: Chest.tsx:25 ~ chestAmount",
    chestAmount && chestAmount.toString()
  );

  return (
    <div>
      <div className="flex w-full flex-col items-center py-16">
        {!chestAmountIsLoading && (
          <p className="text-neutral-light">
            Available {chestAmount.toString()}
          </p>
        )}
        <img src="/menuitem02.png" alt="" className="w-52" />
        <Web3Button
          contractAddress={PACK_ADDRESS}
          action={async () => {
            const openedRewards = await pack?.open(0, 1);
            console.log("Opened rewards:", openedRewards);
            setOpenedPackRewards(openedRewards);
          }}
        >
          Open
        </Web3Button>
      </div>

    </div>
  );
};

export default Chest;
