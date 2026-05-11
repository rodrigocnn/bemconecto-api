import { Request } from 'express';

export type AuthenticatedUser = {
  id: string;
  email: string;
  role: string;
  professionalId: string;
};

export type AuthenticatedRequest = Request & {
  user: AuthenticatedUser;
};
