const express = require("express");
const pg = require("pg");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");

const port = 3005;
const prisma = new PrismaClient(); //  Use the prisma client
const app = express();

let jsonParser = bodyParser.json();

app.use(jsonParser);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", async (_req, res) => {
  console.log("Home");
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post("/user", async (_req, res) => {
  console.log("Create new user");
  console.log(`user\t\temail\n${_req.body.name}\t${_req.body.email}\t`);
  const user = await prisma.user.create({ data: _req.body });
  res.json(user);
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
