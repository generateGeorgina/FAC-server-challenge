const express = require("express");

const server = express();

module.exports = server;

// to pass 1.test.js
server.get("/", (req, res) => {
  res.send(`<h1>hello express</h1>`);
});

// to pass 2.test.js
const staticHandler = express.static("public");
server.use(staticHandler);

server.get("/colour", (req, res) => {
  const hex = req.query.hex || "ffffff";

  res.send(`
    <!doctype html>
    <html>
      <head>
        <style>body{background-color: #${hex}</style>
      </head>
      <body>
      <form>
        <label for="hex">Enter hex code</label>
        <input type="text" id="hex" name="hex" value="${hex}"/>
      </form>
      </body>
    </html>
    `);
});

// initialise 'cheeses' as empty array
const cheeses = [];

// to pass 3.test.js and 4.test.js
server.get("/cheese", (req, res) => {
  // hard coded
  // const name = req.query.name || "gorgonzola";
  // const rating = req.query.rating || 3;

  // create an li element for each cheese submission using .map to loop through the cheeses array
  // in the HTML te mplate literal, we use .join to combine the array of entries
  const list = cheeses.map((cheese) => {
    return `<li>${cheese.name} | ${cheese.rating} stars</li>`;
  });

  const html = `
    <!doctype html>
    <html>
      <head>
        <title>Cheese</title>
      </head>
      <body>
      <form action="/cheese" method="post">
        <label for="name">Enter cheese name</label>
        <input type="text" id="name" name="name" value="name"/>
        <label for="rating">Enter cheese rating</label>
        <input type="range" id="rating" name="rating" value="rating" max="5" step="0.5"/>
        <button>Submit</button>
      </form>
      <ul>${list.join("")}</ul>
      </body>
    </html>`;
  // send response
  res.send(html);
});

// to pass 4.test.js
// .urlencoded is the middleware required to access data coming from the request/req
// extended: false uses native node encoding algorithm for thr url to send data
server.post("/cheese", express.urlencoded({ extended: false }), (req, res) => {
  const name = req.body.name;
  const rating = req.body.rating;
  cheeses.push({ name, rating });
  res.redirect("/cheese");
});
