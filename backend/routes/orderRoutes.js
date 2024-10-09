// Example route for creating an order
const express = require('express');
const Order = require('./../models/orderModel'); 
const router = express.Router();

router.post('/create-order', async (req, res) => {
  const { items, totalAmount, address, userId } = req.body;

  const newOrder = new Order({
    items,
    totalAmount,
    address,
    userId,
  });

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
