/**
 * Imports
 */
import { Database } from "bun:sqlite";

/**
 * Init database
 */
const db = new Database();

/**
 * Basic Setup
 */
db.exec(`
    CREATE TABLE IF NOT EXISTS pr_comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      owner TEXT NOT NULL,
      repo TEXT NOT NULL,
      pull INTEGER NOT NULL,
      filename TEXT NOT NULL,
      comment TEXT NOT NULL,
      meta JSON NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

/**
 * Export
 */
export default db;
