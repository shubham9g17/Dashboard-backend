const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app"); // Adjust the path as needed
const User = require("../models/User.js");
const config = require("../config/config.js");

beforeAll(async () => {
  await mongoose.connect(config.db.url);
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await User.deleteMany();
});

afterEach(async () => {
  await User.deleteMany();
});

describe("Auth APIs", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("token");
  });

  it("should login an existing user", async () => {
    const user = new User({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });
    await user.save();

    const res = await request(app).post("/api/auth/login").send({
      email: "john@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });
});
