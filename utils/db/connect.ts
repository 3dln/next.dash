// import { MONGODB_URI } from 'configs';
import { MongoClient } from 'mongodb';
import logger from 'utils/logger';
export class MongoHelper {
  public static cachedClient: MongoClient;
  public static connect(): Promise<MongoClient> {
    return new Promise((resolve, reject) => {
      const prod = process.env.NODE_ENV === 'production';
      const MONGODB_URI = prod ? process.env['MONGODB_URI'] : process.env['MONGODB_URI_LOCAL'];
      if (!MONGODB_URI) {
        if (prod) {
          logger.error('No mongo connection string. Set MONGODB_URI environment variable');
        } else {
          logger.error('No mongo connection string, set MONGODB_URI_LOCAL environment variable');
        }
        reject('Mongodb Connection string not found');
      } else
        MongoClient.connect(
          MONGODB_URI,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          },
          (err, client: MongoClient) => {
            if (err) {
              logger.error('connection to mongo db failed');
              logger.error(err);
              reject(err);
            } else {
              logger.log('info', 'Successfully connected to mongodb');
              MongoHelper.cachedClient = client;
              resolve(client);
            }
          }
        );
    });
  }
}
