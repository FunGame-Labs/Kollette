import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
dotenv.config();

if (!process.env.PRIVATE_KEY) throw "PRIVATE_KEY not found";
const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!process.env.PUBLIC_KEY) throw "PUBLIC_KEY not found";
const PUBLIC_KEY = process.env.PUBLIC_KEY;

const main = async () => {
  // Constants

  // get contract
  const sdk = ThirdwebSDK.fromPrivateKey(PRIVATE_KEY, "mumbai");

  // create contract
  const contract = await sdk.getContract(
    "0x157BbDC3c4b155Ea78B0F1245FD78C80ccc895B0",
    "edition-drop"
  );

  const price = [0.01, 0.02, 0.05, 0.1, 0.5];
  const amount = [10, 5, 2, 1, 0];
  for (let index = 0; index < price.length; index++) {
    const tokenId = index;

    await contract.claimConditions.set(tokenId, [
      {
        startTime: new Date(),
        price: price[index],
      },
    ]);
  }

  for (let index = 0; index < price.length; index++) {
    // Fund and Mint
    const tx = await contract.claim(index, amount[index] || 10);
    console.log("tx: ", tx);
  }
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
