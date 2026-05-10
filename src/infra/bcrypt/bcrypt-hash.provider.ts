import { HashProvider } from '@/application/auth/providers/hash.provider';
import * as bcrypt from 'bcrypt';

export class BcryptHashProvider implements HashProvider {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
