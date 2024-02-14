export interface DefaultJWT extends Record<string, unknown> {
  email?: string | null;
  exp?: number;
  iat?: number;
  jti?: string;
  name?: string | null;
  picture?: string | null;
  sub?: string;
}

export type SuccessResponse = {
  isError: boolean;
  isTwoFactor?: boolean;
  message?: string;
};
