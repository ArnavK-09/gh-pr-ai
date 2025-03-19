const { createRequestHandler } = require("@expo/server/adapter/vercel");
console.log(require("path").join(__dirname, "../server"));
module.exports = createRequestHandler({
	build: require("path").join(__dirname, "server"),
});
