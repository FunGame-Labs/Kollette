import { type NextPage } from "next";
import ChipsSelect from "../components/ChipsSelect";

const Home: NextPage = () => {
  return (
    <>
      <main>
        <div className="grid h-full min-h-[calc(100vh-66px)] grid-cols-3 px-8 py-16">
          <div className="col-span-2">
            <div className="flex h-full flex-col">
              <ChipsSelect />
            </div>
          </div>
          <div className="col-span-1 w-full rounded-lg bg-neutral-medium p-4">
            <div className="w-full p-4 text-center">
              <h2 className="text-3xl text-white">How to play</h2>
            </div>
            <div className="flex flex-col gap-4 px-4">
              <div className="flex w-full justify-center">
                <img src="/slotprizes.png" alt="" className="w-96" />
              </div>
              <p>
                Start by choosing a chip to play. You can open chest to receive
                a random chips. The chests can be bought on the market page.
              </p>
              <p>
                You can spin the reels by pressing the spin button. The reels
                will spin and then stop to reveal the symbols on each payline.
                If the symbols on a payline match and create a winning
                combination, you will receive a payout based on the paytable for
                the game.
              </p>
              <p>
                There are juicy prizes to be won, such as NFTs from top
                collections.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
