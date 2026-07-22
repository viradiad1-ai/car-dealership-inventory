import request from "supertest";
import app from "../app";

describe("Vehicle API", () => {
  let token: string;

  beforeAll(async () => {
    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({
        email: "dhruv@test.com",
        password: "123456",
      });

    token = loginResponse.body.token;
  });

  it("should add a vehicle", async () => {
    const response = await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send({
        make: "Toyota",
        model: "Fortuner",
        category: "SUV",
        price: 4500000,
        quantity: 5,
      });

    expect(response.status).toBe(201);
  });

  it("should get all vehicles", async () => {
    const response = await request(app).get("/api/vehicles");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
  it("should search vehicles by make", async () => {
  const response = await request(app)
    .get("/api/vehicles/search")
    .query({ make: "Toyota" });

  expect(response.status).toBe(200);
  expect(Array.isArray(response.body)).toBe(true);
});
it("should update a vehicle", async () => {
  const response = await request(app)
    .put("/api/vehicles/1")
    .set("Authorization", `Bearer ${token}`)
    .send({
      make: "Toyota",
      model: "Fortuner Legender",
      category: "SUV",
      price: 4800000,
      quantity: 7,
    });

  expect(response.status).toBe(200);
});
it("should delete a vehicle", async () => {
  const response = await request(app)
    .delete("/api/vehicles/1")
    .set("Authorization", `Bearer ${token}`);

  expect(response.status).toBe(404);
});
it("should purchase a vehicle", async () => {
  const response = await request(app)
    .post("/api/vehicles/1/purchase")
    .set("Authorization", `Bearer ${token}`)
    .send({
      quantity: 2,
    });

  expect(response.status).toBe(400);
});

});
