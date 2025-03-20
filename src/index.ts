import { cors } from "@elysiajs/cors";
import { html } from "@elysiajs/html";
/**
 * Imports
 */
import { Elysia } from "elysia";
import flagsmith from "./flagsmith";
import { generateText } from "./lib/ai";
import { v1Router, v2Router } from "./routers/index";
import presentRoutes from "./routes/index";
import appStore from "./store";

/**
 * Constants
 */
const PORT = 0;
const DEFAULT_API_VERSION: keyof typeof presentRoutes = (
	await flagsmith.getEnvironmentFlags()
).getFeatureValue("default_api_version");

/**
 * Base api router
 */
const api = new Elysia({ prefix: "/api" })
	.use(appStore)
	.use(v1Router)
	.use(v2Router)
	.get("/", ({ store }) => store)
	.get("/flagsmith", async () =>
		JSON.parse(JSON.stringify(await flagsmith.getEnvironmentFlags())),
	)
	.get("/test", async () => {
		const { text } = await generateText({ prompt: "hi" });
		return { text };
	})
	.use(presentRoutes[DEFAULT_API_VERSION])
	.listen(PORT);
/**
 * Elysia Entrypoint
 */
const app = new Elysia()
	.use(cors())
	.use(appStore)
	.use(api)
	.use(html())
	.onError(({ code }) => {
		if (code === "NOT_FOUND") {
			return { message: "Route not found" };
		}
	})
	.onRequest(async ({ store, set }) => {
		store.requests = store.requests + 1;
		if (
			(await flagsmith.getEnvironmentFlags()).getFeatureValue(
				"enable_http_cache",
			)
		) {
			set.headers["Cache-Control"] = `max-age=${3600}`;
		}
	})
	.get("/", () => Bun.file("frontend/index.html").text())
	.listen(PORT);

/**
 * Webserver
 */
export default app;
