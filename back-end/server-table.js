const http = require("http");
const db = require("./db");
const app = require("./app");
const config = require("./config");

const httpServer = http.createServer(app);
//const httpsServer = https.createServer(credentials, app);

httpServer.listen(config.port, () => {
  console.log("HTTP Server running on port 80");
});
