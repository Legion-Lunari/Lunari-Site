const BASE_URL = "https://discord.com/api/v10";

interface ExchangeCodeOpts {
  code: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
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

  return res.json();
};

export const assignRole = async (
  guildId: string,
  userId: string,
  roleId: string,
  botToken: string,
) => {
  const res = await fetch(
    `${BASE_URL}/guilds/${guildId}/members/${userId}/roles/${roleId}`,
    {
      method: "PUT",
      headers: { Authorization: `Bot ${botToken}` },
    },
  );

  if (!res.ok && res.status !== 204)
    throw new Error(`assign role failed: ${res.status}`);
};
