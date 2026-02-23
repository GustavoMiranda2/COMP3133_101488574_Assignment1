/*
Name: Gustavo Miranda
StudentID: 101488574
*/

require("dotenv").config();

const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const connectToDatabase = require("./config/database");
const schema = require("./graphql/schema");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json({ limit: "10mb" }));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

async function startServer() {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();
