"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import {
  useAddress,
  useContract,
  useContractEvents,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import clsx from "clsx";
import type { FC } from "react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { KOLLETTE_ABI } from "../utils/abis";
import { KOLLETTE_ADDRESS } from "../utils/constants";

interface Attribute {
  value: string;
  trait_type: string;
}
interface NFTData {
  balance: string;
  title: string;
  description: string;
  metadata: {
    name: string;
    image: string;
    description: string;
    attributes: Attribute[];
    id: number;
  };
  timeLastUpdated: string;
}

const chipType = [
  { value: "0", image: "/Chip01.png", title: "chip 1" },
  { value: "1", image: "/Chip02.png", title: "chip 2" },
  { value: "2", image: "/Chip03.png", title: "chip 3" },
  { value: "3", image: "/Chip04.png", title: "chip 4" },
  { value: "4", image: "/Chip05.png", title: "chip 5" },
];

const ChipsSelect: FC = () => {
  const [selected, setSelected] = useState<number>(-1);
  const [value, setValue] = useState(chipType[0]!.value);
  const [type, setType] = useState(chipType[0]!.title);

  const address = useAddress();
  const { contract: kollette } = useContract(KOLLETTE_ADDRESS, KOLLETTE_ABI);
  const { mutateAsync: spin } = useContractWrite(kollette, "FUNCTION_NAME");

  const events = useContractEvents(kollette, "Play", { subscribe: true });
  useEffect(() => {
    if (!events.data) {
      return;
    }

    console.log(events.data);
    if (events.data[0]?.data._result === true) {
      toast.success(`You win`);
    }
    if (events.data[0]?.data._result === false) {
      const element = chipType.find(
        (x) => +x.value === events.data[0]?.data._type
      )?.title;
      toast.error(`You lose, enemy weakness was ${element}`);
    }
  }, [events.data]);

  const playGame = async () => {
    if (!address) return;

    const response = await fetch(`/api/server?address=${address}`)
      .then((response) => response.json())
      .catch((err) => console.error(err));

    await spin(["parameters"]);
    await fetch(`/api/register?address=${address}&score=${123}`);
  };

  const playRoulette = async () => {
    await spin([selected, value]);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-row gap-2">
        <RadioGroupPrimitive.Root
          onValueChange={(e) => {
            setValue(e);
            setType(chipType[Number(e)]!.title);
          }}
        >
          <div className="flex">
            {chipType.map((item) => (
              <div key={item.value} className="flex items-center">
                <RadioGroupPrimitive.Item
                  id={item.value}
                  value={item.value}
                  className={clsx(
                    "peer relative h-4 w-4 rounded-full",
                    "focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800"
                  )}
                ></RadioGroupPrimitive.Item>
                <label htmlFor={item.value} className={clsx("cursor-pointer")}>
                  {/* <p className="text-white">{item.title}</p> */}
                  <img src={item.image}></img>
                </label>
              </div>
            ))}
          </div>
        </RadioGroupPrimitive.Root>
      </div>
      <div className="pt-16">
        <Toaster />
        <button onClick={playRoulette} className="btn-primary btn">
          Spin with {type}!
        </button>
      </div>
    </div>
  );
};

export default ChipsSelect;
