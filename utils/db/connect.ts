import { MONGODB_URI } from 'configs';
import { MongoClient } from 'mongodb';
import logger from 'utils/logger';
export class ConnectMongo {
  public static client: MongoClient;
  public static connect(): Promise<MongoClient> {
    return new Promise((resolve, reject) => {
      MongoClient.connect(
        MONGODB_URI || 'mongodb://localhost:27017',
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
        (err, client: MongoClient) => {
          if (err) {
            logger.error(`
          ----------------------------------------
          connection to mongo db failed
          ${err}
          ----------------------------------------
            `);
            reject(err);
          } else {
            logger.log(
              'info',
              `
            ---------------------------------
            Successfully connected to mongodb
            ---------------------------------
          `
            );
            ConnectMongo.client = client;
            resolve(client);
          }
        }
      );
    });
  }
}
