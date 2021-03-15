import { MONGODB_URI } from 'configs';
import { MongoClient } from 'mongodb';
import logger from 'utils/logger';
export class MongoHelper {
  public static client: MongoClient;
  public static connect(): Promise<MongoClient> {
    return new Promise((resolve, reject) => {
      MongoClient.connect(
        'mongodb://localhost:27017/testdb',
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
            MongoHelper.client = client;
            resolve(client);
          }
        }
      );
    });
  }
}
