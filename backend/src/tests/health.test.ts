import request from "supertest";
import app from "../app";

describe("Health API", () => {
  it("should return API message", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Car Dealership Inventory API",
    });
  });
});