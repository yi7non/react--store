require("dotenv").config({ path: ".env" });
const createServer = require("./createServer");

const server = createServer();

// TODO Use express middlware to handle cookies (JWT)
// TODO Use express middlware to populate current user

server.start(
  {
    // Here we instruct the server to accept
    // only calls that come from our app and not
    // calls that come from an external url
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  },
  (deets) => {
    console.log(
      `Yinon Server is now runnig on port http://localhost:${deets.port}`
    );
  }
);
