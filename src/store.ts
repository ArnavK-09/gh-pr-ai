/**
 * Imports
 */
import Elysia from "elysia";

/**
 * Store Data
 */
const STORE = {
	visitors: 0,
};

/**
 * Creating Elysia Webserver Store
 */
export default new Elysia().state(STORE);
