/**
 * Imports
 */
import Elysia, { error, t } from "elysia";
import flagsmith from "../flagsmith";
import { generateText } from "../lib/ai";
import db from "../lib/db";
import { octokit } from "../lib/octokit";
import { reviewPrPrompt } from "../lib/prompts";
import type { GithubPRResponse } from "../types";

const isCacheEnable = async () => {
	const isEnabled = !!(await flagsmith.getEnvironmentFlags()).getFeatureValue(
		"enable_cache",
	);
	console.log("[DEBUG] Cache enabled:", isEnabled);
	return isEnabled;
};

export default new Elysia().post(
	"/review",
	async function* ({ body: { owner, repo, pull } }) {
		console.log("[DEBUG] Starting review for PR:", { owner, repo, pull });

		if (await isCacheEnable()) {
			console.log("[DEBUG] Checking cache for existing reviews");
			const query = db.query(
				"SELECT * FROM pr_comments WHERE owner = $owner AND repo = $repo AND pull = $pull",
			);
			const results = query.all({
				$owner: owner,
				$repo: repo,
				$pull: pull,
			}) as Array<{ filename: string; comment: string; meta: string }>;

			console.log("[DEBUG] Cache query results count:", results);
			if (results.length > 0) {
				console.log("[DEBUG] Found cached results, returning");
				for (const { filename, comment, meta } of results) {
					yield {
						filename: filename,
						comment: comment,
						meta: JSON.parse(meta ?? "{}"),
					};
				}
				return;
			}
		}

		console.log("[DEBUG] Fetching PR info from GitHub");
		const ghPrInfoRes = await Bun.fetch(
			`https://api.github.com/repos/${owner}/${repo}/pulls/${pull}`,
		);
		if (!ghPrInfoRes.ok) {
			console.log("[DEBUG] PR not found:", ghPrInfoRes.status);
			return error(400, { message: "Pull request not found" });
		}

		const ghPrInfo: GithubPRResponse = await ghPrInfoRes.json();
		console.log("[DEBUG] PR info retrieved:", { title: ghPrInfo.title });

		console.log("[DEBUG] Fetching PR files");
		const { data: files } = await octokit.pulls.listFiles({
			owner,
			repo,
			pull_number: Number(pull),
		});
		console.log("[DEBUG] Found", files.length, "files to review");

		for (const file of files) {
			if (!file.patch) {
				console.log("[DEBUG] Skipping file without patch:", file.filename);
				continue;
			}

			console.log("[DEBUG] Generating review for file:", file.filename);
			const prompt = reviewPrPrompt(file.filename, file.patch);
			const { text } = await generateText({ prompt });
			console.log("[DEBUG] Generated review text length:", text.length);

			const commentData = {
				filename: file.filename,
				comment: text,
				meta: {
					title: ghPrInfo.title,
					author: ghPrInfo.user.login,
				},
			};

			if (await isCacheEnable()) {
				console.log("[DEBUG] Caching review result");
				try {
					const query = db.query(
						"INSERT INTO pr_comments (owner, repo, pull, filename, comment, meta) VALUES ($owner, $repo, $pull, $filename, $comment, $meta)",
					);
					query.run({
						$owner: owner,
						$repo: repo,
						$pull: pull,
						$filename: file.filename,
						$comment: text,
						$meta: JSON.stringify(commentData.meta),
					});
					console.log("[DEBUG] Cached review for:", file.filename);
				} catch (error) {
					console.error("[ERROR] Failed to cache review:", error);
				}
			}

			console.log("[DEBUG] Yielding review result for:", commentData);
			yield commentData;
		}
	},
	{
		body: t.Object({
			owner: t.String(),
			repo: t.String(),
			pull: t.Number(),
		}),
	},
);
