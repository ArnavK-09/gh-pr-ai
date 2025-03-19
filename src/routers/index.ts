/**
 * Imports
 */
import Elysia from "elysia";
import searchRoutesForV1 from "../routes/v1";
import searchRoutesForV2 from "../routes/v2";

export const v2Router = new Elysia({ prefix: "/v2" })
	.use(searchRoutesForV2)
	.all("/", () => ({ version: 2 }));

export const v1Router = new Elysia({ prefix: "/v1" })
	.use(searchRoutesForV1)
	.all("/", () => ({ version: 1 }));
