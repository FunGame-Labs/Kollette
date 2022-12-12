"use client";

import {
  useActiveListings,
  useContract,
  useNetwork,
  useNetworkMismatch,
} from "@thirdweb-dev/react";
import { ChainId } from "@thirdweb-dev/sdk/evm";
import { FC } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MARKETPLACE_ADDRESS } from "../utils/constants";
import Card from "./Card";

const Listing: FC = () => {
  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace"
  );

  const { data: listings, isLoading: loadingListings } =
    useActiveListings(marketplace);

  async function buyNft(listingId: string) {
    try {
      // Ensure user is on the correct network
      if (networkMismatch) {
        switchNetwork && switchNetwork(ChainId.Goerli);
        return;
      }

      // Simple one-liner for buying the NFT
      await marketplace?.buyoutListing(listingId, 1);
      toast("NFT bought successfully!");
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <>
      <Toaster />
      <div className="grid grid-cols-5 gap-4">
        {loadingListings ? (
          <div>Loading listings...</div>
        ) : (
          <>
            {listings?.map((listing) => (
              <div key={listing.id} className="span-1">
                <Card
                  title={listing.asset.name || ""}
                  subtitle={
                    listing.buyoutCurrencyValuePerToken.displayValue +
                    " " +
                    listing.buyoutCurrencyValuePerToken.symbol +
                    " x " +
                    listing.quantity.toString()
                  }
                  description={listing.asset.description || ""}
                  image={listing.asset.image || ""}
                  btnAction={() => buyNft(listing.id)}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Listing;
