const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); // Adjust the path as needed
const Order = require('../models/Order.js');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Order.deleteMany();
});

describe('Order APIs', () => {
  it('should return a list of orders', async () => {
    const order = new Order({
      click_id: 'click1',
      user_id: "60c72b2f9b1d8e1d88c8a7e2",
    });
    await order.save();

    const res = await request(app).get('/api/orders');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
