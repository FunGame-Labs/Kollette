"use client";

import { FC } from "react";
import useStore from "../utils/store";
import ERC1155RewardBox from "./ERC1155RewardBox";

const LastOpened: FC = () => {
  const { openedPackRewards } = useStore();
  console.log(
    "🚀 ~ file: LastOpened.tsx:9 ~ openedPackRewards",
    openedPackRewards
  );

  return (
    <div className="pt-12">
      {/* <h2>Opened Rewards</h2> */}
      <div className="w-full rounded-xl bg-gradient-to-r from-[#740ddc] to-[rgb(246,78,255)] p-[5px]">
        {openedPackRewards &&
          openedPackRewards?.erc1155Rewards &&
          openedPackRewards?.erc1155Rewards?.length > 0 && (
            <div className="flex h-full w-full flex-col justify-between items-center rounded-lg bg-neutral-dark p-4">
              <h3 className="text-lg text-white">Chest Content</h3>
              <div>
                {openedPackRewards?.erc1155Rewards.map((reward, i) => (
                  <ERC1155RewardBox reward={reward} key={i} />
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default LastOpened;
