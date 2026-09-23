CREATE TABLE IF NOT EXISTS chain_locks (
  chain INTEGER PRIMARY KEY,
  unlocked INTEGER NOT NULL DEFAULT 0,
  unlocked_at TEXT
);

INSERT OR IGNORE INTO chain_locks (chain, unlocked) VALUES
  (1, 0),
  (2, 0),
  (3, 0),
  (4, 0);
