import { AdapterUser } from '@auth/core/adapters';
import { JWT } from '@auth/core/jwt';
import { Account, Awaitable, Profile } from '@auth/core/types';
import { DefaultJWT } from '@configs';
import { Session, User } from 'next-auth';

export type SessionParams = {
  session: Session;
  token?: DefaultJWT;
};

export type JWTParams = {
  token: JWT & { agent: string; sessionId?: string };
  user: (User | AdapterUser) & { agent: string };
};

export type SignInParams = {
  account: Account | null;
  user: (User | AdapterUser) & { agent: string };
  profile?: Profile;
};

export type CallbacksType = {
  jwt: (params: JWTParams) => Promise<JWT>;
  session: (params: SessionParams) => Promise<Session>;
  signIn: (params: SignInParams) => Awaitable<boolean>;
};
