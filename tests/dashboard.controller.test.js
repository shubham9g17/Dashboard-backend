const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); // Adjust the path as needed
const Click = require('../models/Click.js');
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
  await Click.deleteMany();
  await Order.deleteMany();
});

describe('Dashboard APIs', () => {
  it('should return dashboard data', async () => {
    const click = new Click({
      merchant: 'merchant1',
      product: 'product1',
      price: 10,
      user_id: "60c72b2f9b1d8e1d88c8a7e2",
    });
    await click.save();

    const order = new Order({
      click_id: click._id,
      user_id: "60c72b2f9b1d8e1d88c8a7e2",
    });
    await order.save();

    const res = await request(app).get('/api/dashboard');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('clicks');
    expect(res.body).toHaveProperty('orders');
    expect(res.body).toHaveProperty('amount');
  });
});
