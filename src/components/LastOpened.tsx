"use client";

import { FC, useState } from "react";
import useStore from "../utils/store";
import ERC1155RewardBox from "./ERC1155RewardBox";

const LastOpened: FC = () => {
  const { openedPackRewards } = useStore();
  console.log(
    "🚀 ~ file: LastOpened.tsx:9 ~ openedPackRewards",
    openedPackRewards
  );

  return (
    <div>
      {/* <h2>Opened Rewards</h2> */}
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

export default LastOpened;
