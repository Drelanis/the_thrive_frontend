export interface DefaultJWT extends Record<string, unknown> {
  email?: string | null;
  exp?: number;
  iat?: number;
  jti?: string;
  name?: string | null;
  picture?: string | null;
  sessionId?: string;
  sub?: string;
}
