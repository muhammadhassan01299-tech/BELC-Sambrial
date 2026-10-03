/**
 * Tiny database layer for BELC (SQLite, no extra install needed).
 *
 * Uses Node's built-in `node:sqlite` (Node 22.13+), so there is nothing native to compile.
 * The database is ONE file:  data/belc.sqlite   (folder can be changed with DATA_DIR).
 *
 * IMPORTANT for hosting: on free hosts with temporary disks (Render free, Railway trial...)
 * this file is deleted on every redeploy. See README -> "Database" for the permanent options.
 * Enquiries are also e-mailed to the academy, so nothing is lost either way.
 */
import fs from 'node:fs';
import path from 'node:path';

export interface EnquiryInput {
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  service: string;
  message: string;
  ip: string;
}

export interface EnquiryRow extends EnquiryInput {
  id: number;
  created_at: string;
}

// `any` on purpose: node:sqlite is loaded lazily and may not exist on very old Node versions
let db: any = null;

export async function initDb(dataDir: string): Promise<boolean> {
  try {
    const { DatabaseSync } = await import('node:sqlite');
    fs.mkdirSync(dataDir, { recursive: true });
    db = new DatabaseSync(path.join(dataDir, 'belc.sqlite'));
    db.exec(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id         INTEGER PRIMARY KEY AUTOINCREMENT,
        name       TEXT NOT NULL,
        phone      TEXT NOT NULL,
        whatsapp   TEXT NOT NULL DEFAULT '',
        email      TEXT NOT NULL DEFAULT '',
        service    TEXT NOT NULL DEFAULT '',
        message    TEXT NOT NULL DEFAULT '',
        ip         TEXT NOT NULL DEFAULT '',
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
    `);
    return true;
  } catch (err) {
    console.warn('[db] SQLite not available - enquiries will only be e-mailed/logged.', err);
    db = null;
    return false;
  }
}

export function dbReady(): boolean {
  return db !== null;
}

export function saveEnquiry(e: EnquiryInput): number | null {
  if (!db) return null;
  const result = db
    .prepare(
      'INSERT INTO enquiries (name, phone, whatsapp, email, service, message, ip) VALUES (?, ?, ?, ?, ?, ?, ?)'
    )
    .run(e.name, e.phone, e.whatsapp, e.email, e.service, e.message, e.ip);
  return Number(result.lastInsertRowid);
}

export function listEnquiries(limit = 500): EnquiryRow[] {
  if (!db) return [];
  return db.prepare('SELECT * FROM enquiries ORDER BY id DESC LIMIT ?').all(limit) as EnquiryRow[];
}
