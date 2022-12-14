import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";
import dotenv from "dotenv";
import type { NextApiRequest, NextApiResponse } from "next";
import { KOLLETTE_ABI } from "../../utils/abis";
import { KOLLETTE_ADDRESS, PACK_ADDRESS } from "../../utils/constants";
dotenv.config();

if (!process.env.ADMIN_KEY) throw "ADMIN_KEY not found";
const ADMIN_KEY = process.env.ADMIN_KEY;

if (!process.env.PUBLIC_KEY) throw "PUBLIC_KEY not found";
const PUBLIC_KEY = process.env.PUBLIC_KEY;

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address, chipType } = req.query;

  let winThreshold = 500000;
  switch (chipType) {
    case "0":
      winThreshold = 800000;
      break;
    case "1":
      winThreshold = 700000;
      break;
    case "2":
      winThreshold = 600000;
      break;
    case "3":
      winThreshold = 500000;
      break;
    case "4":
      winThreshold = 200000;
      break;
    default:
      break;
  }
  const maximum = 1000000,
    minimum = 100;
  const score = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  const isWin = score > winThreshold;
  console.log("isWin: ", isWin, " Score: ", score);

  const sdk = ThirdwebSDK.fromPrivateKey(ADMIN_KEY, "mumbai");
  const kollette = await sdk.getContractFromAbi(KOLLETTE_ADDRESS, KOLLETTE_ABI);
  // const getRandomData = await kollette.call("getRandom", score);
  const addScoreData = await kollette.call("addScore", address, score);

  if (isWin) {
    const pack = await sdk.getContract(PACK_ADDRESS, "pack");
    await pack.call("safeTransferFrom", PUBLIC_KEY, address, 0, 1, "0x00");
  }

  res.json({
    score,
    isWin,
  });
};

export default register;
