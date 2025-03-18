import { createGroq } from "@ai-sdk/groq";
import { generateText as aiGenerateText } from "ai";
import flagsmith from "./flagsmith";

// @TODO
const groq = createGroq({
	apiKey: Bun.env.GROQ_API_KEY,
});

const DEFAULT_MODEL = async () => {
	return (await flagsmith.getEnvironmentFlags()).getFeatureValue(
		"ai_model_name",
	);
};

export const generateText = async (
	params: Omit<Parameters<typeof aiGenerateText>[0], "model">,
) => {
	return await aiGenerateText({
		model: groq(`${await DEFAULT_MODEL()}` || "llama3-70b-8192"),
		...params,
	});
};
