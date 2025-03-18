/**
 * Imports
 */
import { Database } from "bun:sqlite";

/**
 * Init database
 */
const db = new Database(":memory:");

/**
 * Export
 */
export default db;
