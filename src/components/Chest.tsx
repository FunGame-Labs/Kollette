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

const Chest: FC = () => {
  const address = useAddress();
  const { contract: pack } = useContract(PACK_ADDRESS, "pack");
  const { data: nfts, isLoading } = useOwnedNFTs(pack, address);
  const [openedPackRewards, setOpenedPackRewards] = useState<PackRewards>();

  const { data: chestAmount, isLoading: chestAmountIsLoading } =
    useContractRead(pack, "balanceOf", address, 0);
  console.log(
    "🚀 ~ file: Chest.tsx:25 ~ chestAmount",
    chestAmount && chestAmount.toString()
  );

  return (
    <div>
      <div className="flex w-full flex-col items-center pb-8">
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
      <h2>Opened Rewards</h2>

      <div>
        {openedPackRewards &&
          openedPackRewards?.erc1155Rewards &&
          openedPackRewards?.erc1155Rewards?.length > 0 && (
            <>
              <h3>ERC-1155 Tokens</h3>
              <div>
                {openedPackRewards?.erc1155Rewards.map((reward, i) => (
                  <ERC1155RewardBox reward={reward} key={i} />
                ))}
              </div>
            </>
          )}
      </div>
    </div>
  );
};

export default Chest;
