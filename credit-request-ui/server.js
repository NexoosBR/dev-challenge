var express = require("express");
var path = require("path");
var serveStatic = require("serve-static");

const app = express();
app.use("/", serveStatic(path.join(__dirname, "/dist")));

const port = process.env.PORT || 8080;
app.listen(port);

console.log("server started " + port);
