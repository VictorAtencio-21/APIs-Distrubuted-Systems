const http = require("http");
const app = require("./app");
const server = http.createServer(app);

const { API_PORT } = process.env;
const { API_HOST } = process.env;

const port = process.env.PORT || API_PORT;
const host = process.env.HOST || API_HOST;

// server listening 
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});