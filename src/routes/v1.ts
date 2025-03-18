import Elysia, { error, t } from "elysia";

export default new Elysia().get(
	"/review/:user/:repo/:pull",
	async ({ params }) => {
		const ghDiffResponse = await Bun.fetch(
			`https://github.com/${params.user}/${params.repo}/pull/${params.pull}.diff`,
		);
		if (!ghDiffResponse.ok) {
			throw error(400, { message: "Pull request not found" });
		}
		const ghPrInfoRes = await Bun.fetch(
			`https://api.github.com/repos/${params.user}/${params.repo}/pulls/${params.pull}`,
		);
		if (!ghPrInfoRes.ok) {
			throw error(400, { message: "Pull request not found" });
		}
		const ghDiff = await ghDiffResponse.text();
		const ghPrInfo: GithubPRResponse = await ghPrInfoRes.json();
		return { ghDiff, ghPrInfo };
	},
	{
		params: t.Object({
			user: t.String(),
			repo: t.String(),
			pull: t.Number(),
		}),
	},
);
