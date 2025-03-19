/**
 * Imports
 */
import Elysia from "elysia";

/**
 * Store Data
 */
const STORE = {
	requests: 0,
};

/**
 * Creating Elysia Webserver Store
 */
export default new Elysia().state(STORE);
