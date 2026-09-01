CREATE TABLE IF NOT EXISTS restoration_fragments (
  fragment INTEGER PRIMARY KEY,
  unlocked INTEGER NOT NULL DEFAULT 0,
  unlocked_at TEXT
);

INSERT OR IGNORE INTO restoration_fragments (fragment, unlocked) VALUES
  (1, 0),
  (2, 0),
  (3, 0);
