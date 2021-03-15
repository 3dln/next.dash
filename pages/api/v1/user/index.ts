import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { MongoHelper } from 'utils/db/connect';

const handler = nc();

handler.get((req: NextApiRequest, res: NextApiResponse) => {
  MongoHelper.connect();
  res.json({ success: true });
});

export default handler;
