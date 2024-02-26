export interface DefaultJWT extends Record<string, unknown> {
  agent: string;
  sessionId?: string;
}
