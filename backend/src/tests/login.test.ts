import request from "supertest";
import app from "../app";

describe("Login API", () => {
  it("should login user", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "dhruv@test.com",
        password: "123456",
      });

    expect(response.status).toBe(200);
  });
});