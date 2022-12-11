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
import { FC, useRef } from "react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { KOLLETTE_ABI } from "../utils/abis";
import { KOLLETTE_ADDRESS } from "../utils/constants";
import SlotMachine from "../lib";

const timeout = (delay: number) => new Promise((res) => setTimeout(res, delay));

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
  const [slotMachine1, setSlotMachine1] = useState<SlotMachine>();
  const [slotMachine2, setSlotMachine2] = useState<SlotMachine>();
  const [slotMachine3, setSlotMachine3] = useState<SlotMachine>();
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

  // slot
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  useEffect(() => {
    if (ref1.current) {
      const machine: SlotMachine = new SlotMachine(ref1.current, {
        active: 1,
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
        active: 1,
        delay: 450,
      });
      setSlotMachine3(machine);
    }
  }, []);

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

  const spinMachine = async () => {
    slotMachine1?.shuffle(3);
    slotMachine2?.shuffle(4);
    slotMachine3?.shuffle(5);
    console.log(
      "🚀 ~ file: ChipsSelect.tsx:90 ~ spinMachine ~ slotMachine?.active",
      slotMachine1?.active
    );
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
        <button onClick={playRoulette} className="btn btn-primary">
          Spin with {type}!
        </button>
      </div>

      {/* slot machine */}
      <div id="randomize">
        <div className="container">
          <h1>Randomize your stuff!</h1>

          <div className="flex flex-row">
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
              <div id="machine0Result" className="col-xs-4 machineResult">
                Index: 0
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
              <div id="machine1Result" className="col-xs-4 machineResult">
                Index: 1
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
              <div id="machine2Result" className="col-xs-4 machineResult">
                Index: 2
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="btn-group-justified btn-group" role="group">
              <button
                id="randomizeButton"
                type="button"
                className="btn-danger btn btn-lg"
              >
                Shuffle
              </button>
            </div>
          </div>
        </div>
      </div>
      <button onClick={spinMachine} className="btn btn-primary">
        Spin with {type}!
      </button>
    </div>
  );
};

export default ChipsSelect;