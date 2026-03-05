import request from "supertest";
import app from "../app.js";

describe("Health check", () => {
  test("GET /health should return ok", async () => {
    const res = await request(app).get("/health");
    console.log(res.body);
    // expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});
