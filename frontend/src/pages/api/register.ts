import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";
import dotenv from "dotenv";
import type { NextApiRequest, NextApiResponse } from "next";
import { KOLLETTE_ABI } from "../../utils/abis";
import { KOLLETTE_ADDRESS } from "../../utils/constants";
dotenv.config();

if (!process.env.ADMIN_KEY) throw "ADMIN_KEY not found";
const ADMIN_KEY = process.env.ADMIN_KEY;

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address, score } = req.query;

  const sdk = ThirdwebSDK.fromPrivateKey(ADMIN_KEY, "optimism-goerli");
  const kollette = await sdk.getContractFromAbi(KOLLETTE_ADDRESS, KOLLETTE_ABI);
  const tx = await kollette.call("addScore", address, score);
  res.json({ data: tx });
};

export default register;
