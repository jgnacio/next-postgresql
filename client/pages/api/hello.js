// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const axios = require("axios");

export default function hello(req, res) {
  let buffer = "";
  axios
    .get("http://api:3005/")
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      buffer = response;
      console.log(error);
    });
  res.status(200).json({ name: "hola" });
}
