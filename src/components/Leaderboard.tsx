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
    <div className="overflow-x-auto">
      <table className="table-zebra table-compact table w-full">
        <thead>
          <tr>
            <th className="text-start">User</th>
            <th className="text-start">Score</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading &&
            data.map((item: any, index: number) => {
              return (
                <tr key={index} className="hover">
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
