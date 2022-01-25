const faker = require('faker');
const boom = require('@hapi/boom');
const {Op} = require('sequelize');
const {models} = require('../libs/sequelize');

class ProductsService {

  constructor(){
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const rst = await models.Product.create(data);
    return rst;
  }

  async find(query) {
    const options = {
      include: ['category'],
      where: {}
    }
    const {limit, offset} = query;
    if(limit && offset){
      options.limit = parseInt(limit),
      options.offset = parseInt(offset)
    }
    const {price} = query;
    if(price){
      options.where.price = price;
    }
    const {price_min, price_max} = query;
    if(price_min && price_max){
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max
      }
    }
    const rst = await models.Product.findAndCountAll(options);
    return rst;
  }

  async findOne(id) {
    const rst =await  models.User.findByPk(id, {
      include: ['category']
    });
    if( !rst ){
      throw boom.notFound('product not found');
    }
    return rst;
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }

}

module.exports = ProductsService;
