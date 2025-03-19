/**
 * Imports
 */
export const reviewPrPrompt = (filename: string, diff: string) => `
You are a highly skilled AI code reviewer. Your task is to analyze the following Git diff and provide a constructive code review.
Highlight potential issues, suggest improvements, and ensure best practices are followed.

File: ${filename}
Changes:
\`\`\`diff
${diff}
\`\`\`

Provide a short but thorough review:
  `;
