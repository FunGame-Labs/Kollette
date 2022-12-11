"use client";

import { useContract, useContractRead } from "@thirdweb-dev/react";
import { FC } from "react";
import { KOLLETTE_ABI } from "../utils/abis";
import { KOLLETTE_ADDRESS } from "../utils/constants";

const Leaderboard: FC = () => {
  const { contract: kollette } = useContract(KOLLETTE_ADDRESS, KOLLETTE_ABI);
  const { data, isLoading, error } = useContractRead(kollette, "getAll");
  console.log("🚀 ~ file: ChipsSelect.tsx:54 ~ data", data);

  return (
    <div className="h-80 overflow-y-scroll">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-start">Address</th>
            <th className="text-start">Id</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading &&
            data.map((item: any, index: number) => {
              return (
                <tr key={index}>
                  <td>{`${item.user.slice(0, 4)}...${item.user.slice(-4)}`}</td>
                  <td>{item.score.toString()}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
