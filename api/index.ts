const { createRequestHandler } = require("@expo/server/adapter/vercel");
console.log(require("node:path").join(__dirname, "../server"));
module.exports = createRequestHandler({
	build: require("node:path").join(__dirname, "server"),
});
