const test = require("node:test");
const assert = require("node:assert");
const { request } = require("./helpers.js");
const server = require("../src/server.js");

test("/ returns hello world", async () => {
  const { status, body } = await request("/");

  assert.equal(status, 200);
  assert.match(
    body,
    /<h1>hello express<\/h1>/i,
    `Expected HTML to include <h1>Hello Express</h1>, but received:\n${body}\n`
  );
});

// test("home route returns expected page", async () => {
//   const app = server.listen(9876);
//   const response = await fetch("http://localhost:9876");
//   app.close();

//   assert.equal(response.status, 200);
// });
