export const TOKEN_PROVIDER = Symbol('TOKEN_PROVIDER');

export abstract class TokenProvider {
  abstract sign(payload: Record<string, unknown>): Promise<string>;
}
