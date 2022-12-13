"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { useMutation } from "@tanstack/react-query";
import {
  useAddress,
  useContract,
  useContractEvents,
  useContractWrite,
} from "@thirdweb-dev/react";
import clsx from "clsx";
import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAudio } from "react-use";
import SlotMachine from "../lib";
import { KOLLETTE_ABI } from "../utils/abis";
import { KOLLETTE_ADDRESS, PACK_ADDRESS } from "../utils/constants";

const timeout = (delay: number) => new Promise((res) => setTimeout(res, delay));

const chipType = [
  { value: "0", image: "/Chip01.png", title: "10 chip" },
  { value: "1", image: "/Chip02.png", title: "20 chip" },
  { value: "2", image: "/Chip03.png", title: "50 chip" },
  { value: "3", image: "/Chip04.png", title: "100 chip" },
  { value: "4", image: "/Chip05.png", title: "500 chip" },
];

const ChipsSelect: FC = () => {
  const [selected, setSelected] = useState<number>(-1);
  const [value, setValue] = useState(chipType[0]!.value);
  const [type, setType] = useState(chipType[0]!.title);
  const [slotMachine1, setSlotMachine1] = useState<SlotMachine>();
  const [slotMachine2, setSlotMachine2] = useState<SlotMachine>();
  const [slotMachine3, setSlotMachine3] = useState<SlotMachine>();
  const address = useAddress();
  const mutation = useMutation({
    mutationFn: () => fetch(`/api/register?address=${address}`),
    onSuccess: async (data, error, variables, context) => {
      console.log("success spin: ", data);
      console.log("success variables: ", variables);
      console.log("success context: ", context);
      alert("You scored and won a chest. Go to Chests page to open it!")
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
      const element = chipType.find(
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

  // const playGame = async () => {
  //   if (!address) return;

  //   const response = await fetch(`/api/server?address=${address}`)
  //     .then((response) => response.json())
  //     .catch((err) => console.error(err));

  //   await spin(["parameters"]);
  //   await fetch(`/api/register?address=${address}&score=${123}`);
  // };

  const spinMachine = async () => {
    if (!address) {
      alert("connect your wallet to mumbai to play");
      return;
    }
    // await wheelControls.play();

    slotMachine1?.shuffle(3);
    slotMachine2?.shuffle(5);
    slotMachine3?.shuffle(7);

    mutation.mutate();
    // const response = await fetch(`/api/register?address=${address}`)
    //   .then((response) => response.json())
    //   .catch((err) => console.error(err));
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
            className="btn-primary btn-lg btn"
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
                  <img src={item.image} className="w-40"></img>
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
