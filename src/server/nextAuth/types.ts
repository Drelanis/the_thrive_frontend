import { AdapterUser } from '@auth/core/adapters';
import { JWT } from '@auth/core/jwt';
import { Account, Awaitable, Profile, User } from '@auth/core/types';
import { DefaultJWT } from '@configs';
import { Session } from 'next-auth';

type SessionParams = {
  session: Session;
  token?: DefaultJWT;
};

type JWTParams = {
  token: JWT;
};

type SignInParams = {
  account: Account | null;
  user: User | AdapterUser;
  profile?: Profile;
};

export type CallbacksType = {
  jwt: (params: JWTParams) => Promise<JWT>;
  session: (params: SessionParams) => Session;
  signIn: (params: SignInParams) => Awaitable<boolean>;
};
