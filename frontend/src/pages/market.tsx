import { type NextPage } from "next";
import ChipsSelect from "../components/ChipsSelect";
import BattlefieldHead from "../components/BattlefieldHead";
import Card from "../components/Card";
import Navbar from "../components/Navbar";

const Play: NextPage = () => {
  return (
    <>
      <main>
        <div className="flex h-full min-h-[calc(100vh-66px)] flex-col px-8 py-16">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <div className="flex">
                <img src="/menuitem02.png" alt="" className="w-28" />
                <h1 className="text-5xl font-extrabold italic tracking-tight text-white sm:text-[5rem]">
                  Marketplace
                </h1>
              </div>
              <p className="pt-4 text-lg text-neutral-light">
                Try your luck and play roulette today!
              </p>
            </div>
            <div>
              <button className="btn">Create</button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex w-full gap-2">
              <button className="btn">Filter</button>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search..."
                  className="input-bordered input w-full"
                />
              </div>
              <select
                className="select-bordered select max-w-xs"
                defaultValue={"Price Low to High"}
              >
                <option>Price Low to High</option>
                <option>Price High to Low</option>
              </select>
              <div className="flex items-center p-4">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-primary"></span>
                </span>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <div className="span-1">
                <Card
                  title={"title #123"}
                  description={
                    "Sit nisi Lorem voluptate. Mollit id aute est mollit elit incididunt aliqua duis fugiat in minim adipisicing. Ut consectetur consequat non exercitation eiusmod pariatur ipsum laborum velit eu amet non elit velit occaecat. Cillum occaecat dolore fugiat aliqua pariatur. Ullamco duis in adipisicing pariatur veniam exercitation proident fugiat nostrud."
                  }
                  image={
                    "https://i.picsum.photos/id/888/200/200.jpg?hmac=k4DxIkJ_O8YKi3TA5I9xxJYJzqpSvx3QmJlgZwHMojo"
                  }
                  btnText={""}
                  btnAction={function (): void {
                    console.log("hello");
                  }}
                />
              </div>
              <div className="span-1">
                <Card
                  title={""}
                  description={""}
                  image={""}
                  btnText={""}
                  btnAction={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Play;
