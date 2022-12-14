"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { useMutation, useQueries } from "@tanstack/react-query";
import {
  useAddress,
  useContract,
  useContractEvents,
} from "@thirdweb-dev/react";
import clsx from "clsx";
import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAudio } from "react-use";
import SlotMachine from "../lib";
import { KOLLETTE_ABI } from "../utils/abis";
import {
  CHESTCHIP_ADDRESS,
  DEPOSIT_ADDRESS,
  KOLLETTE_ADDRESS,
} from "../utils/constants";

const timeout = (delay: number) => new Promise((res) => setTimeout(res, delay));

export const chipTypes = [
  { value: "0", image: "/Chip01.png", title: "10 chip" },
  { value: "1", image: "/Chip02.png", title: "20 chip" },
  { value: "2", image: "/Chip03.png", title: "50 chip" },
  { value: "3", image: "/Chip04.png", title: "100 chip" },
  { value: "4", image: "/Chip05.png", title: "500 chip" },
];

const ChipsSelect: FC = () => {
  const [value, setValue] = useState("0");
  const [type, setType] = useState("10 chip");
  const [slotMachine1, setSlotMachine1] = useState<SlotMachine>();
  const [slotMachine2, setSlotMachine2] = useState<SlotMachine>();
  const [slotMachine3, setSlotMachine3] = useState<SlotMachine>();
  const address = useAddress();
  const mutation = useMutation({
    mutationFn: async () =>
      await fetch(`/api/register?address=${address}`).then((data) =>
        data.json()
      ),
    onSuccess: async (data) => {
      console.log("success spin: ", data);
      if (data.isWin) {
        alert(
          `You scored ${data.score} and won a chest. Go to Chests page to open it!`
        );
      } else {
        alert(`You scored ${data.score}, try again to win a chest!`);
      }
    },
  });

  const [wheelAudio, , wheelControls] = useAudio({
    src: "/wheel.wav",
    autoPlay: false,
  });
  const [coinAudio, , coinControls] = useAudio({
    src: "/coins.wav",
    autoPlay: false,
  });

  const { contract: chip } = useContract(CHESTCHIP_ADDRESS, "edition");
  const chipAmounts = useQueries({
    queries: chipTypes.map((chipT) => {
      return {
        queryKey: ["chip", chipT.value],
        queryFn: async () => await chip?.balanceOf(address || "", chipT.value),
      };
    }),
  });

  const { contract: kollette } = useContract(KOLLETTE_ADDRESS, KOLLETTE_ABI);
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
      const element = chipTypes.find(
        (x) => +x.value === events.data[0]?.data._type
      )?.title;
      toast.error(`You lose`);
    }
  }, [events.data]);

  // slot
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  useEffect(() => {
    if (ref1.current) {
      const machine: SlotMachine = new SlotMachine(ref1.current, {
        active: 0,
        delay: 450,
      });
      setSlotMachine1(machine);
    }
    if (ref2.current) {
      const machine: SlotMachine = new SlotMachine(ref2.current, {
        active: 1,
        delay: 450,
      });
      setSlotMachine2(machine);
    }
    if (ref3.current) {
      const machine: SlotMachine = new SlotMachine(ref3.current, {
        active: 2,
        delay: 450,
      });
      setSlotMachine3(machine);
    }
  }, []);

  const spinMachine = async () => {
    if (!address || !chip) {
      alert("connect your wallet to mumbai to play");
      return;
    }
    const data = await chip.transfer(DEPOSIT_ADDRESS, value, 1);
    mutation.mutate();

    await wheelControls.play();
    slotMachine1?.shuffle(5);
    slotMachine2?.shuffle(8);
    slotMachine3?.shuffle(11);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Toaster />

      {/* slot machine */}
      <div
        id="randomize"
        className="h-[490px] w-full bg-[url('/slotmachine.png')] bg-cover"
      >
        <div className="container pt-[250px]">
          <div className="flex flex-row justify-center gap-4">
            <div className="col-sm-4">
              <div className="randomize__item">
                <div ref={ref1} id="machine0" className="randomizeMachine">
                  <div>
                    <img src="/slot1.png" />
                  </div>
                  <div>
                    <img src="/slot2.png" />
                  </div>
                  <div>
                    <img src="/slot3.png" />
                  </div>
                  <div>
                    <img src="/slot4.png" />
                  </div>
                  <div>
                    <img src="/slot5.png" />
                  </div>
                  <div>
                    <img src="/slot6.png" />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="randomize__item">
                <div ref={ref2} id="machine1" className="randomizeMachine">
                  <div>
                    <img src="/slot1.png" />
                  </div>
                  <div>
                    <img src="/slot2.png" />
                  </div>
                  <div>
                    <img src="/slot3.png" />
                  </div>
                  <div>
                    <img src="/slot4.png" />
                  </div>
                  <div>
                    <img src="/slot5.png" />
                  </div>
                  <div>
                    <img src="/slot6.png" />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="randomize__item">
                <div ref={ref3} id="machine2" className="randomizeMachine">
                  <div>
                    <img src="/slot1.png" />
                  </div>
                  <div>
                    <img src="/slot2.png" />
                  </div>
                  <div>
                    <img src="/slot3.png" />
                  </div>
                  <div>
                    <img src="/slot4.png" />
                  </div>
                  <div>
                    <img src="/slot5.png" />
                  </div>
                  <div>
                    <img src="/slot6.png" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="btn-group-justified btn-group" role="group">
          <button
            id="randomizeButton"
            type="button"
            onClick={spinMachine}
            disabled={mutation.isLoading}
            className={clsx(
              "btn-primary btn-lg btn",
              mutation.isLoading && "loading"
            )}
          >
            Spin with {type}!
          </button>
        </div>
      </div>

      {/* Chips */}
      <div className="flex flex-row gap-2">
        {coinAudio}
        {wheelAudio}
        <RadioGroupPrimitive.Root
          onValueChange={(e) => {
            coinControls.play();
            setValue(e);
            setType(chipTypes[Number(e)]!.title);
          }}
        >
          <div className="flex">
            {chipTypes.map((item, index) => (
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
                  <img src={item.image} className="w-40"></img>
                  <div className="flex w-full justify-center">
                    {chipAmounts[0]?.isLoading || chipAmounts[0]?.isError ? (
                      <p>Loading...</p>
                    ) : (
                      <p>{chipAmounts[index]?.data?.toString()}</p>
                    )}
                  </div>
                </label>
              </div>
            ))}
          </div>
        </RadioGroupPrimitive.Root>
      </div>
    </div>
  );
};

export default ChipsSelect;
