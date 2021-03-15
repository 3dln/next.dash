import { UserDocument } from 'models/User';
import { NextApiRequest } from 'next';

export interface ExtendedNextApiRequest extends NextApiRequest {
  isAuthenticated: () => boolean;
  user: UserDocument;

  path: string;
}
