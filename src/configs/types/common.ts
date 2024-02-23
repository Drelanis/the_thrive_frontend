export interface DefaultJWT extends Record<string, unknown> {
  agent: string;
  sub: string;
  sessionId?: string;
}
