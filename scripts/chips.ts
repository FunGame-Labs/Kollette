import { ThirdwebSDK } from "@thirdweb-dev/sdk";
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
  // const sdk = ThirdwebSDK.fromPrivateKey(PRIVATE_KEY, "mumbai");
  const sdk = ThirdwebSDK.fromPrivateKey(PRIVATE_KEY, "optimism-goerli");

  // create contract
  const contractAddress = await sdk.deployer.deployEditionDrop({
    name: "Chip",
    primary_sale_recipient: PUBLIC_KEY,
  });
  const contract = await sdk.getContract(contractAddress, "edition-drop");
  console.log(contractAddress);

  // Create
  const metadatas = [
    {
      name: "Chip 1",
      description: "Have fun playing the roulette and collect unique NFTs.",
      image: fs.readFileSync(path.resolve(__dirname, "../assets/Chip01.png")),
    },
    {
      name: "Chip 2",
      description: "Have fun playing the roulette and collect unique NFTs.",
      image: fs.readFileSync(path.resolve(__dirname, "../assets/Chip02.png")),
    },
    {
      name: "Chip 3",
      description: "Have fun playing the roulette and collect unique NFTs.",
      image: fs.readFileSync(path.resolve(__dirname, "../assets/Chip03.png")),
    },
    {
      name: "Chip 4",
      description: "Have fun playing the roulette and collect unique NFTs.",
      image: fs.readFileSync(path.resolve(__dirname, "../assets/Chip04.png")),
    },
    {
      name: "Chip 5",
      description: "Have fun playing the roulette and collect unique NFTs.",
      image: fs.readFileSync(path.resolve(__dirname, "../assets/Chip05.png")),
    },
  ];

  // uploads and creates the NFTs on chain
  const results = await contract.erc1155.lazyMint(metadatas);

  const price = [0.01, 0.02, 0.05, 0.1, 0.5];
  const amount = [10, 5, 2, 1, 0];
  for (let index = 0; index < results.length; index++) {
    const tokenId = results[index].id;

    await contract.claimConditions.set(tokenId, [
      {
        startTime: new Date(),
        price: price[index],
      },
    ]);
  }

  for (let index = 0; index < price.length; index++) {
    // Fund and Mint
    const tx = await contract.claim(index, amount[index]);
    console.log("tx: ", tx);
  }
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
