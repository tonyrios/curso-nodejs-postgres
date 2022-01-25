const express = require('express');

const OrderService = require('./../services/order.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createOrderSchema, getOrderSchema, addItemSchema } = require('./../schemas/order.schema');

const router = express.Router();
const service = new OrderService();

router.get('/', async (req, res, next) => {
  try {
    const rst = await service.find();
    res.json(rst);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rst = await service.findOne(id);
      res.json(rst);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const rst = await service.create(body);
      res.status(201).json(rst);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const rst = await service.addItem(body);
      res.status(201).json(rst);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
