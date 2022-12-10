import { type NextPage } from "next";
import ChipsSelect from "../components/ChipsSelect";

const Home: NextPage = () => {
  return (
    <>
      <main>
        <div className="grid h-full min-h-[calc(100vh-66px)] grid-cols-3 px-8 py-16">
          <div className="col-span-2">
            <div className="flex h-full flex-col justify-between">
              <div>
                <h1 className="text-5xl font-extrabold italic tracking-tight text-white sm:text-[5rem]">
                  Kollette
                </h1>
                <p className="pt-4 text-lg text-neutral-light">
                  Try your luck and play roulette today!
                </p>
                <div>Wheel</div>
              </div>
              <ChipsSelect />
              <div className="flex flex-col gap-4">
                <div className="flex w-full justify-center">
                  <button className="btn">Play</button>
                </div>
                <div className="flex justify-center gap-8 p-4">
                  <div className="h-24 w-24 rounded-full bg-blue-400"></div>
                  <div className="h-24 w-24 rounded-full bg-blue-400"></div>
                  <div className="h-24 w-24 rounded-full bg-blue-400"></div>
                  <div className="h-24 w-24 rounded-full bg-blue-400"></div>
                  <div className="h-24 w-24 rounded-full bg-blue-400"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 w-full rounded-lg bg-neutral-medium p-4">
            <h2 className="text-white">Global Chat</h2>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
