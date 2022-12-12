import { type NextPage } from "next";
import CreateModal from "../components/CreateModal";
import Listing from "../components/Listing";

const Play: NextPage = () => {
  return (
    <>
      <main>
        <div className="flex h-full min-h-[calc(100vh-66px)] flex-col px-8 py-16">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <div className="flex items-center">
                <img src="/menuitem02.png" alt="" className="w-28" />
                <h1 className="text-5xl font-extrabold italic tracking-tight text-white sm:text-[5rem]">
                  Marketplace
                </h1>
              </div>
              <p className="mb-8 px-4 text-lg text-neutral-light">
                The ultimate destination for lootbox fans and collectors. Our
                platform allows you to buy, sell, and trade a wide range of
                unique digital assets, including reward items, rare lootboxes,
                and more.
              </p>
            </div>
            <div className="pt-4">
              <CreateModal />
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
            <Listing />
          </div>
        </div>
      </main>
    </>
  );
};

export default Play;
