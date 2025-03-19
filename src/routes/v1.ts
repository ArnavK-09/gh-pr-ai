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
	return !!(await flagsmith.getEnvironmentFlags()).getFeatureValue(
		"enable_cache",
	);
};

export default new Elysia().post(
	"/review",
	async function* ({ body: { owner, repo, pull } }) {
		if (await isCacheEnable()) {
			const query = db.query(
				"SELECT filename, comment FROM pr_comments WHERE owner = $owner AND repo = $repo AND pull = $pull",
			);
			const results = query.all({
				$owner: owner,
				$repo: repo,
				$pull: pull,
			}) as Array<{ filename: string; comment: string; meta: string }>;
			if (results.length > 0) {
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
		const ghPrInfoRes = await Bun.fetch(
			`https://api.github.com/repos/${owner}/${repo}/pulls/${pull}`,
		);
		if (!ghPrInfoRes.ok)
			throw error(400, { message: "Pull request not found" });

		const ghPrInfo: GithubPRResponse = await ghPrInfoRes.json();

		const { data: files } = await octokit.pulls.listFiles({
			owner,
			repo,
			pull_number: Number(pull),
		});

		for (const file of files) {
			if (!file.patch) continue;

			const prompt = reviewPrPrompt(file.filename, file.patch);
			const { text } = await generateText({ prompt });

			const commentData = {
				filename: file.filename,
				comment: text,
				meta: {
					body: ghPrInfo.body,
					title: ghPrInfo.title,
					author: ghPrInfo.user.login,
				},
			};
			if (await isCacheEnable()) {
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
			}

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
