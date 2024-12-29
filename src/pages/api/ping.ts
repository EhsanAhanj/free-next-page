import { NextApiRequest, NextApiResponse } from "next";

async function GET({ query }: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json({ ping: "pong" });
}

export default GET;
