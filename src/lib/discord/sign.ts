const importKey = async (secret: string) => {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
};

const toBase64Url = (bytes: Uint8Array) => {
  let str = "";
  bytes.forEach((b) => (str += String.fromCharCode(b)));

  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

const fromBase64Url = (str: string) => {
  str = str.replace(/-/g, "+").replace(/_/g, "/");

  while (str.length % 4) str += "=";

  const bin = atob(str);
  const bytes = new Uint8Array(bin.length);

  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);

  return bytes;
};

export const signPayload = async (payload: unknown, secret: string) => {
  const json = JSON.stringify(payload);
  const key = await importKey(secret);
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(json),
  );

  return `${toBase64Url(new TextEncoder().encode(json))}.${toBase64Url(new Uint8Array(sig))}`;
};

export const verifyPayload = async <T = unknown>(
  token: string,
  secret: string,
): Promise<T | null> => {
  const [data, sig] = token.split(".");

  if (!data || !sig) return null;

  const key = await importKey(secret);
  const dataBytes = fromBase64Url(data);
  const sigBytes = fromBase64Url(sig);
  const valid = await crypto.subtle.verify("HMAC", key, sigBytes, dataBytes);

  if (!valid) return null;

  try {
    return JSON.parse(new TextDecoder().decode(dataBytes)) as T;
  } catch {
    return null;
  }
};
