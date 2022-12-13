import { type NextPage } from "next";
import Chest from "../components/Chest";
import Leaderboard from "../components/Leaderboard";
import OpenActivities from "../components/OpenActivities";

const Home: NextPage = () => {
  return (
    <>
      <main>
        <div className="grid min-h-[calc(100vh-66px)] grid-cols-3 gap-4 px-8 py-16">
          <div className="col-span-1 w-full rounded-lg border border-neutral-medium p-4">
            <div className="flex h-full flex-col">
              <div className="p-4">
                <h1 className="text-3xl font-extrabold italic text-white">
                  Leaderboard
                </h1>
                <p className="pt-4 text-lg text-neutral-light">
                  WORLD TOP 20 PLAYERS
                </p>
              </div>
              <Leaderboard />
            </div>
          </div>
          <div className="col-span-1 flex flex-col gap-4">
            <div className="h-full w-full rounded-lg border border-neutral-medium p-4">
              <div className="p-4">
                <h1 className="text-3xl font-extrabold italic text-white">
                  Chests
                </h1>
              </div>
              <Chest />
            </div>
            <div className="w-full rounded-lg border border-neutral-medium p-4">
              <h2 className="text-white">Activites</h2>
              <OpenActivities />
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
