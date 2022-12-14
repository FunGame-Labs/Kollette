"use client";

import { FC } from "react";
import useStore from "../utils/store";
import ERC1155RewardBox from "./ERC1155RewardBox";
import ERC721RewardBox from "./ERC721RewardBox";

const LastOpened: FC = () => {
  const { openedPackRewards } = useStore();

  return (
    <div className="flex flex-col gap-8 pt-12">
      {/* <h2>Opened Rewards</h2> */}
      <>
        {openedPackRewards &&
          openedPackRewards?.erc1155Rewards &&
          openedPackRewards?.erc1155Rewards?.length > 0 && (
            <div className="w-full rounded-xl bg-gradient-to-r from-[#740ddc] to-[rgb(246,78,255)] p-[5px]">
              <div className="flex h-full w-full flex-col items-center justify-between rounded-lg bg-neutral-dark p-4">
                <h3 className="text-lg text-white">Chest Content</h3>
                <div>
                  {openedPackRewards?.erc1155Rewards.map((reward, i) => (
                    <ERC1155RewardBox reward={reward} key={i} />
                  ))}
                </div>
              </div>
            </div>
          )}
      </>
      <>
        {openedPackRewards &&
          openedPackRewards?.erc721Rewards &&
          openedPackRewards?.erc721Rewards?.length > 0 && (
            <div className="w-full rounded-xl bg-gradient-to-r from-[#740ddc] to-[rgb(246,78,255)] p-[5px]">
              <div className="flex h-full w-full flex-col items-center justify-between rounded-lg bg-neutral-dark p-4">
                <h3 className="text-lg text-white">Chest Content</h3>
                <div>
                  {openedPackRewards?.erc721Rewards.map((reward, i) => (
                    <ERC721RewardBox reward={reward} key={i} />
                  ))}
                </div>
              </div>
            </div>
          )}
      </>
    </div>
  );
};

export default LastOpened;
