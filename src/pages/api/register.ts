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
  const { address } = req.query;

  const maximum = 1000000,
    minimum = 100;
  const score = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  const isWin = score > 500000;
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
    data: {
      score,
      isWin,
    },
  });
};

export default register;
