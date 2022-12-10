"use client";

import {
  useAddress,
  useContract,
  useContractRead,
  useOwnedNFTs,
  Web3Button,
} from "@thirdweb-dev/react";
import { PackRewards } from "@thirdweb-dev/sdk/dist/declarations/src/evm/schema";
import { BigNumber, utils } from "ethers";
import type { FC } from "react";
import { useState } from "react";
import ERC1155RewardBox from "../components/ERC1155RewardBox";
import { PACK_ADDRESS } from "../utils/constants";

const Chest: FC = () => {
  const address = useAddress();
  const { contract: pack } = useContract(PACK_ADDRESS, "pack");
  const { data: nfts, isLoading } = useOwnedNFTs(pack, address);
  const [openedPackRewards, setOpenedPackRewards] = useState<PackRewards>();
  const { contract } = useContract(
    "0xA9BB549899512f296825cb68F0347298917A1616"
  );
  const { data: chestAmount, isLoading: chestAmountIsLoading } =
    useContractRead(contract, "balanceOf", address, 0);
  console.log(
    "🚀 ~ file: Chest.tsx:25 ~ chestAmount",
    chestAmount && chestAmount.toString()
  );

  return (
    <div>
      <div className="flex w-full flex-col pb-8">
        <h2 className="text-xl font-bold text-white">Chest</h2>
        <p className="text-neutral-light">Open Chest.</p>
        {!chestAmountIsLoading && (
          <p className="text-neutral-light">
            Available {chestAmount.toString()}
          </p>
        )}
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
