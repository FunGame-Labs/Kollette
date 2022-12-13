import { ThirdwebNftMedia, useContract, useNFT } from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
import React from "react";

type Props = {
  reward: {
    tokenId: string | number | bigint | BigNumber;
    contractAddress: string;
  };
};

export default function ERC721RewardBox({ reward }: Props) {
  const { contract: collection } = useContract(reward.contractAddress);
  const { data } = useNFT(collection, reward.tokenId);

  return (
    <div>
      {data && (
        <div className="flex flex-col items-center">
          <ThirdwebNftMedia metadata={data?.metadata} />
          <h3>{data?.metadata.name}</h3>
        </div>
      )}
    </div>
  );
}
