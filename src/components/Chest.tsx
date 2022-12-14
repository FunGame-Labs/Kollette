"use client";

import { useQueries } from "@tanstack/react-query";
import { useAddress, useContract, Web3Button } from "@thirdweb-dev/react";
import type { FC } from "react";
import { useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { PACK_ADDRESS } from "../utils/constants";
import useStore from "../utils/store";

const Chest: FC = () => {
  const address = useAddress();
  const [isExploding, setIsExploding] = useState(false);

  const { contract: pack } = useContract(PACK_ADDRESS, "pack");
  const { setOpenedPackRewards } = useStore();

  const chestAmounts = useQueries({
    queries: [0, 1].map((tokenId) => {
      return {
        queryKey: ["chest", tokenId],
        queryFn: async () => await pack?.balanceOf(address || "", tokenId),
      };
    }),
  });

  return (
    <div>
      <>{isExploding && <ConfettiExplosion />}</>

      <Swiper
        modules={[Pagination, Navigation]}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        navigation={true}
        spaceBetween={500}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {[0, 1].map((tokenId) => (
          <SwiperSlide key={tokenId}>
            <div className="flex w-full flex-col items-center gap-4 p-8">
              <div className="w-fit rounded border">
                <img src={`/chest${tokenId}.png`} alt="" className="w-52" />
              </div>
              {!chestAmounts[0]?.isLoading && (
                <p className="text-neutral-light">
                  Available:{" "}
                  {chestAmounts[tokenId]?.data?.toString() || "Loading..."}
                </p>
              )}
              <Web3Button
                contractAddress={PACK_ADDRESS}
                action={async () => {
                  const openedRewards = await pack?.open(tokenId, 1);
                  console.log("Opened rewards:", openedRewards);
                  setOpenedPackRewards(openedRewards);
                }}
              >
                Open
              </Web3Button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Chest;
