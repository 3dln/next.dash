import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { MongoHelper } from 'utils/db/connect';
import logger from 'utils/logger';

const handler = nc();

handler.get((req: NextApiRequest, res: NextApiResponse) => {
  if (MongoHelper.cachedClient) {
    logger.debug('DB is already connected');
  } else MongoHelper.connect();
  res.json({ success: true });
});

export default handler;
