export type CompanyType = {
  accounts: AccountType[];
  email: string;
  emailVerified: Date;
  id: string;
  name: string;
  password: string;
};

export type AccountType = {
  access_token: string;
  companyId: string;
  expires_at: Date;
  id: string;
  id_token: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string;
  scope: string;
  session_state: string;
  token_type: string;
  type: string;
};
