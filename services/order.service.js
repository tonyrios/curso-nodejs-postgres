const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class OrderService {

  constructor(){
  }
  async create(data) {
    const rst = await models.Order.create(data);
    return rst;
  }

  async addItem(data) {
    const rst = await models.OrderProduct.create(data);
    return rst;
  }

  async find() {
    const rst = await models.Order.findAll();
    return rst;
  }

  async findOne(id) {
    const rst =await  models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });
    if( !rst ){
      throw boom.notFound('order not found');
    }
    return rst;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = OrderService;
