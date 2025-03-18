/**
 * Imports
 */
import { Flagsmith } from "flagsmith-nodejs";

/**
 * Flagmsith Setup
 */
const flagsmith = new Flagsmith({
	environmentKey: Bun.env.FLAGSMITH_ENV_KEY,
});

/**
 * Export
 */
export default flagsmith;
