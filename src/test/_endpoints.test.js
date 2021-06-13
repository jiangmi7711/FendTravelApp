const app = require("../server/index.js");
const supertest = require('supertest');
const request = supertest(app);

it("gets the test endpoint", async done => {
    const response = await request.post("/coords");
    expect(response.status).toBe(200);
    done();
});