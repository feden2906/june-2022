const User = require('../dataBase/User');

module.exports = {
  find: async (query) => {
    const { limit = 10, page = 1, name } = query;

    let findObj = {};

    if (name) {
      findObj = { ...findObj, name: new RegExp(name) };
    }

    const [users, count] = await Promise.all([
      User.find(findObj).limit(limit).skip((+page - 1) * limit),
      User.count(findObj),
    ])

    return {
      users,
      page: +page,
      count,
    }
  }
}
