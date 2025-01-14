const express = require('express');

const { fileServices } = require('./services');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users', async (req, res) => {
  const users = await fileServices.reader();

  res.json(users);
});

app.post('/users', async (req, res) => {
  const { name, age } = req.body;

  if (!name || name.length < 2) {
    return res.status(400).json('Wrong name');
  }

  if (!age || age < 18 || Number.isNaN(age)) {
    return res.status(400).json('Wrong age');
  }

  const users = await fileServices.reader();

  const newUser = { id: users[users.length -1].id + 1, name, age };

  users.push(newUser);

  await fileServices.writer(users);

  res.status(201).json(newUser);
});

app.get('/users/:userId', async (req, res) => {
  const { userId } = req.params;

  const users = await fileServices.reader();

  const user = users.find((user) => user.id === +userId);

  if (!user) {
    return res.status(404).json(`User with id ${userId} not found`);
  }

  res.json(user);
});

app.put('/users/:userId', async (req, res) => {
  const newUserInfo = req.body;
  const { userId } = req.params;

  const users = await fileServices.reader();

  const index = users.findIndex((user) => user.id === +userId);

  if (index === -1) {
    return res.status(404).json(`User with id ${userId} not found`);
  }

  users[index] = { ...users[index], ...newUserInfo };

  await fileServices.writer(users);

  res.status(201).json(users[index]);
});

app.delete('/users/:userId', async (req, res) => {
  const { userId } = req.params;

  const users = await fileServices.reader();

  const index = users.findIndex((user) => user.id === +userId);

  if (index === -1) {
    return res.status(404).json(`User with id ${userId} not found`);
  }

  users.splice(index, 1);

  await fileServices.writer(users);

  res.sendStatus(204);
});

app.get('/', (req, res) => {
  res.json('WELOCME')
})

app.listen(5000, () => {
  console.log('Server listen 5000');
});
