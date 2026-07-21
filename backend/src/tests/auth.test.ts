import request from "supertest";
import app from "../app";

describe("Authentication API", () => {
  it("should register a new user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Dhruv",
        email: "dhruv@test.com",
        password: "123456"
      });

    expect(response.status).toBe(201);
  });
});