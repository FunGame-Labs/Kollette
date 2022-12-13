"use client";

import {
  useContract,
  useContractEvents,
  useContractWrite,
} from "@thirdweb-dev/react";
import { FC, useEffect, useState } from "react";
import { PACK_ADDRESS } from "../utils/constants";

const OpenActivities: FC = () => {
  const { contract: pack } = useContract(PACK_ADDRESS, "pack");
  const { mutateAsync: spin, data } = useContractWrite(pack, "play");
  const [activities, setActivities] = useState<any[]>();

  const events = useContractEvents(pack, "PackOpened", { subscribe: true });
  useEffect(() => {
    if (!events.data) {
      return;
    }

    console.log(events.data);
    setActivities(events.data);
  }, [events.data]);

  return (
    <div className="h-80 overflow-y-scroll">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-start">Asset</th>
            <th className="text-start">Id</th>
            <th className="text-start">Amount</th>
          </tr>
        </thead>
        <tbody>
          {activities &&
            activities.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{`${item.data.rewardUnitsDistributed[0].assetContract.slice(
                    0,
                    4
                  )}...${item.data.rewardUnitsDistributed[0].assetContract.slice(
                    -4
                  )}`}</td>
                  <td>
                    {item.data.rewardUnitsDistributed[0].tokenId.toString()}
                  </td>
                  <td>
                    {item.data.rewardUnitsDistributed[0].totalAmount.toString()}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default OpenActivities;
