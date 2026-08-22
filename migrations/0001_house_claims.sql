CREATE TABLE IF NOT EXISTS house_claims (
  discord_id TEXT PRIMARY KEY,
  house TEXT NOT NULL,
  discord_username TEXT,
  claimed_at INTEGER NOT NULL
);
