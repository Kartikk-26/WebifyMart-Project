const express = require('express');
const Stripe = require('stripe');
const Order = require('../models/orderModel');
const router = express.Router();
require('dotenv').config();
const bodyParser = require('body-parser');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout', async (req, res) => {
  const { items, address, userId, totalAmount } = req.body;

  try {
    const line_items = items.map((item) => ({
      price_data: {
        currency: 'inr',
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.post(
  '/webhook',
  bodyParser.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      const { metadata } = session;
      const { userId, items, address, totalAmount } = JSON.parse(
        metadata.orderDetails
      );

      const newOrder = new Order({
        items,
        totalAmount,
        address,
        userId,
      });

      try {
        await newOrder.save();
        res.status(201).send('Order created successfully!');
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  }
);

module.exports = router;
