const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app.js"); // Adjust the path as needed
const Click = require("../models/Click.js");
const User = require("../models/User.js");
const config = require("../config/config.js");

let token;

beforeAll(async () => {
  await mongoose.connect(config.db.url);
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Click.deleteMany();
  await User.deleteMany();
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

  token = res.body.token;
});

afterEach(async () => {
  await Click.deleteMany();
  await User.deleteMany();
});

describe("Click APIs", () => {
  it("should return a list of clicks", async () => {
    const click = new Click({
      merchant: "merchant1",
      product: "product1",
      price: 10,
      user_id: "60c72b2f9b1d8e1d88c8a7e2",
    });
    await click.save();

    const res = await request(app)
      .get("/api/clicks")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
