export const HASH_PROVIDER = Symbol('HASH_PROVIDER');

export abstract class HashProvider {
  abstract hash(password: string): Promise<string>;
  abstract compare(password: string, hash: string): Promise<boolean>;
}
