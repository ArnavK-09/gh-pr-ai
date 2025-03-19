/**
 * Imports
 */
import { Octokit } from "@octokit/rest";

export const octokit = new Octokit({
	auth: process.env.GITHUB_TOKEN,
});

/**
 *   if (reviewComments.length > 0) {
    await octokit.issues.createComment({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      issue_number: Number(PR_NUMBER),
      body: reviewComments.join("

---

"),
    });
  }
 */
