import { treaty } from "@elysiajs/eden";
import type app from "./src";

const eden = treaty<typeof app>("https://gh-pr-ai.onrender.com/");

console.time("fetch");
const { data, error } = await eden.api.v1.review.post({
	owner: "tscircuit",
	repo: "winterspec",
	pull: 1,
});

const prComments: Array<{
	filename: string;
	comment: string;
	meta: {
		body: string;
		title: string;
		author: string;
	};
}> = [];

if (error) {
	console.error(error);
	process.exit(1);
}

for await (const chunk of data as any) prComments.push(chunk);

console.log("end", prComments.length);
console.timeEnd("fetch");
