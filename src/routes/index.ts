/**
 * Imports
 */
import v1Routes from "./v1";
import v2Routes from "./v2";

/**
 * Map of avaiable routes versioning
 */
export default new Proxy(
	{
		v1: v1Routes,
		v2: v2Routes,
	},
	{
		get(target, prop) {
			// @ts-expect-error Default v1 version
			return prop in target ? target[prop] : v1Routes;
		},
	},
);
