const boom = require('@hapi/boom');

const {models} = require('../libs/sequelize');

class CategoryService {

  constructor(){
  }
  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const rst = await models.Category.findAll();
    return rst;
  }

  async findOne(id) {
    const rst =await  models.Category.findByPk(id, {
      include: ['products']
    });
    if( !rst ){
      throw boom.notFound('category not found');
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

module.exports = CategoryService;
