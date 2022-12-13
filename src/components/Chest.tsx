"use client";

import {
  useAddress,
  useContract,
  useContractRead,
  Web3Button,
} from "@thirdweb-dev/react";
import type { FC } from "react";
import { useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { PACK_ADDRESS } from "../utils/constants";
import useStore from "../utils/store";

const Chest: FC = () => {
  const address = useAddress();
  const [isExploding, setIsExploding] = useState(false);

  const { contract: pack } = useContract(PACK_ADDRESS, "pack");
  const { setOpenedPackRewards } = useStore();

  const { data: chestAmount, isLoading: chestAmountIsLoading } =
    useContractRead(pack, "balanceOf", address, 0);
  console.log(
    "🚀 ~ file: Chest.tsx:25 ~ chestAmount",
    chestAmount && chestAmount.toString()
  );

  return (
    <div>
      <>{isExploding && <ConfettiExplosion />}</>

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
