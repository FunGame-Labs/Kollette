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
  const sdk = ThirdwebSDK.fromPrivateKey(PRIVATE_KEY, "mumbai");

  // create contract
  const contractAddress = await sdk.deployer.deployEdition({
    name: "Chest Chip",
    primary_sale_recipient: PUBLIC_KEY,
  });
  const contract = await sdk.getContract(contractAddress, "edition");
  console.log(contractAddress);

  // Create
  const metadataWithSupply = [
    {
      supply: 5000, // The number of this NFT you want to mint
      metadata: {
        name: "Chip 1",
        description: "Have fun playing the roulette and collect unique NFTs.",
        image: fs.readFileSync(path.resolve(__dirname, "../assets/Chip01.png")),
      },
    },
    {
      supply: 2000,
      metadata: {
        name: "Chip 2",
        description: "Have fun playing the roulette and collect unique NFTs.",
        image: fs.readFileSync(path.resolve(__dirname, "../assets/Chip02.png")),
      },
    },
    {
      supply: 1000,
      metadata: {
        name: "Chip 3",
        description: "Have fun playing the roulette and collect unique NFTs.",
        image: fs.readFileSync(path.resolve(__dirname, "../assets/Chip03.png")),
      },
    },
    {
      supply: 500,
      metadata: {
        name: "Chip 4",
        description: "Have fun playing the roulette and collect unique NFTs.",
        image: fs.readFileSync(path.resolve(__dirname, "../assets/Chip04.png")),
      },
    },
    {
      supply: 100,
      metadata: {
        name: "Chip 5",
        description: "Have fun playing the roulette and collect unique NFTs.",
        image: fs.readFileSync(path.resolve(__dirname, "../assets/Chip05.png")),
      },
    },
  ];

  // uploads and creates the NFTs on chain
  const results = await contract.erc1155.mintBatch(metadataWithSupply);
  if (results[0]) {
    const firstNFT = await results[0].data();
    console.log("🚀 firstNFT ~ ", firstNFT);
  }
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
