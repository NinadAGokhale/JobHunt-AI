import Database from 'better-sqlite3'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DB_PATH = join(__dirname, '..', 'data', 'jobhunt.db')

export function initDB() {
  const { mkdir } = await import('fs/promises')
  await mkdir(join(__dirname, '..', 'data'), { recursive: true })

  const db = new Database(DB_PATH)
  db.pragma('journal_mode = WAL')
  db.pragma('foreign_keys = ON')

  db.exec(`
    CREATE TABLE IF NOT EXISTS jobs (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      company TEXT NOT NULL,
      location TEXT,
      salary TEXT,
      description TEXT,
      url TEXT,
      source TEXT NOT NULL DEFAULT 'linkedin',
      match_score REAL,
      match_details TEXT,
      status TEXT NOT NULL DEFAULT 'discovered',
      notes TEXT,
      posted_date TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
    CREATE INDEX IF NOT EXISTS idx_jobs_score ON jobs(match_score);
    CREATE INDEX IF NOT EXISTS idx_jobs_source ON jobs(source);
  `)

  return db
}

export function getDB() {
  return new Database(DB_PATH)
}
