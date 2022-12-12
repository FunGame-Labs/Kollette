import { Transition } from "@headlessui/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import cx from "classnames";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";

import { useContract } from "@thirdweb-dev/react";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk/evm";
import { MARKETPLACE_ADDRESS, CHESTCHIP_ADDRESS } from "../utils/constants";

export default function CreateModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    console.log("submitted: ", data);
    createDirectListing(data.tokenId, data.price, data.quantity);
  };

  async function createDirectListing(
    // contractAddress: string,
    tokenId: string,
    price: string,
    quantity: number
  ) {
    try {
      const transaction = await marketplace?.direct.createListing({
        assetContractAddress: CHESTCHIP_ADDRESS, // Contract Address of the NFT
        buyoutPricePerToken: price, // Maximum price, the auction will end immediately if a user pays this price.
        currencyContractAddress: NATIVE_TOKEN_ADDRESS, // NATIVE_TOKEN_ADDRESS is the cryptocurency that is native to the network. i.e. Goerli Ether.
        listingDurationInSeconds: 60 * 60 * 24 * 7, // When the auction will be closed and no longer accept bids (1 Week)
        quantity: quantity, // How many of the NFTs are being listed (useful for ERC 1155 tokens)
        startTimestamp: new Date(0), // When the listing will start (now)
        tokenId: tokenId, // Token ID of the NFT.
      });

      return transaction;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Trigger asChild>
        <button className="btn">Create</button>
      </DialogPrimitive.Trigger>
      <Transition.Root show={isOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogPrimitive.Overlay
            forceMount
            className="fixed inset-0 z-20 bg-black/50"
          />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <DialogPrimitive.Content
            forceMount
            className={cx(
              "fixed z-50",
              "w-[95vw] max-w-md rounded-lg p-4 md:w-full",
              "top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]",
              "bg-white dark:bg-gray-800",
              "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
            )}
          >
            <DialogPrimitive.Title className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Create Listing
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="mt-2 text-sm font-normal text-gray-700 dark:text-gray-400">
              List your item
            </DialogPrimitive.Description>
            <form className="mt-2 space-y-2" onSubmit={handleSubmit(onSubmit)}>
              <fieldset>
                {/* <legend>Choose your favorite monster</legend> */}
                <label htmlFor="tokenId" className="label">
                  Token ID
                </label>
                <input
                  id="tokenId"
                  type="text"
                  placeholder="Token ID"
                  autoComplete="given-name"
                  className="input w-full max-w-xs"
                  {...register("tokenId")}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="price" className="label">
                  ETH Price
                </label>
                <input
                  id="price"
                  type="text"
                  placeholder="Sale Price"
                  className="input w-full max-w-xs"
                  {...register("price")}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="quantity" className="label">
                  Quantity
                </label>
                <input
                  id="quantity"
                  type="text"
                  placeholder="Amount"
                  className="input w-full max-w-xs"
                  {...register("quantity")}
                />
              </fieldset>

              <div className="mt-4 flex justify-end">
                <button type="submit" className="btn-primary btn">
                  Create
                </button>
              </div>
            </form>

            <DialogPrimitive.Close
              className={cx(
                "absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1",
                "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
              )}
            >
              <Cross1Icon className="h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-400" />
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </Transition.Child>
      </Transition.Root>
    </DialogPrimitive.Root>
  );
}
