import Elysia, { error } from "elysia";

export default new Elysia().all("/*", () => {
	throw error(400, { message: "Not Implemented" });
});
