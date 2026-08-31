const BASE_URL = "https://discord.com/api/v10";

interface ExchangeCodeOpts {
  code: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

export interface DiscordGuildMember {
  roles: string[];
}

export const exchangeCode = async (opts: ExchangeCodeOpts) => {
  const body = new URLSearchParams({
    client_id: opts.clientId,
    client_secret: opts.clientSecret,
    grant_type: "authorization_code",
    code: opts.code,
    redirect_uri: opts.redirectUri,
  });

  const res = await fetch(`${BASE_URL}/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) throw new Error(`token exchange failed: ${res.status}`);

  return res.json() as Promise<{ access_token: string }>;
};

export const fetchDiscordUser = async (accessToken: string) => {
  const res = await fetch(`${BASE_URL}/users/@me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) throw new Error(`fetch user failed: ${res.status}`);

  return res.json() as Promise<{ id: string; username: string }>;
};

export const getGuildMember = async (
  guildId: string,
  userId: string,
  botToken: string,
) => {
  const res = await fetch(`${BASE_URL}/guilds/${guildId}/members/${userId}`, {
    headers: { Authorization: `Bot ${botToken}` },
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`fetch guild member failed: ${res.status}`);

  return res.json() as Promise<DiscordGuildMember>;
};

export const assignRole = async (
  guildId: string,
  userId: string,
  roleId: string,
  botToken: string,
) => {
  let res: Response;
  try {
    res = await fetch(
      `${BASE_URL}/guilds/${guildId}/members/${userId}/roles/${roleId}`,
      {
        method: "PUT",
        headers: { Authorization: `Bot ${botToken}` },
      },
    );
  } catch (error) {
    console.error("[discord assign role] request failed", {
      guildId,
      userId,
      roleId,
      error,
    });
    throw error;
  }

  if (!res.ok && res.status !== 204) {
    const body = (await res.text()).slice(0, 2_000);
    console.error("[discord assign role] request rejected", {
      guildId,
      userId,
      roleId,
      status: res.status,
      statusText: res.statusText,
      body,
      retryAfter: res.headers.get("retry-after"),
      rateLimitBucket: res.headers.get("x-ratelimit-bucket"),
      rateLimitRemaining: res.headers.get("x-ratelimit-remaining"),
      rateLimitResetAfter: res.headers.get("x-ratelimit-reset-after"),
      discordRequestId: res.headers.get("x-discord-request-id"),
    });
    throw new Error(`assign role failed: ${res.status}`);
  }
};
