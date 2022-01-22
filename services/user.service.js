const boom = require('@hapi/boom');
const getConnection = require('../libs/mariadb');

class UserService {
  constructor() {}

  async create(data) {
    return data;
  }

  async find() {
    const connection = await getConnection();
    const [rows, fields] = await connection.query('SELECT * FROM tasks');
    return rows;
  }

  async findOne(id) {
    return { id };
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

module.exports = UserService;
