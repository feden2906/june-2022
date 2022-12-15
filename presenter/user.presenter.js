const normalize = (user) => {
  return {
    name: user.name,
    email: user.email,
    age: user.age,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

const normalizeMany = (users) => {
  return users.map(user => normalize(user));
}

module.exports = {
  normalize,
  normalizeMany,
}
