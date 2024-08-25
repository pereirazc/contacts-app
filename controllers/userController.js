const db = require('../models');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await db.User.create({ username, email, password });
    res.status(201).json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.User.findOne({ where: { email } });

    if (!user || !(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { register, login };