// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const axios = require("axios");

export default function hello(req, res) {
  let buffer = "";
  axios
    .get("http://api:3005/")
    .then(async function (response) {
      buffer = await response;
    })
    .catch(function (error) {
      buffer = response;
      console.log(error);
    });
  console.log(typeof buffer);
  console.log(buffer);
  res.status(200).json({ name: buffer });
}
