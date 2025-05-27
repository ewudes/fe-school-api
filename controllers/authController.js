const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDb } = require('../db');

const JWT_SECRET = process.env.JWT_SECRET;

async function getAllUsers(req, res) {
  const db = getDb();
  const users = await db.collection("users").find({}, { projection: { login: 1 } }).toArray();
  res.send(users);
}

async function register(req, res) {
  const { email, password } = req.body;
  const db = getDb();
  const users = db.collection('users');

  const existingUser = await users.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: 'Пользователь уже существует' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await users.insertOne({ email, password: hashedPassword });
  res
    .status(201)
    .json({
      message: 'Пользователь зарегистрирован',
      userId: result.insertedId,
    });
}

async function login(req, res) {
  const { email, password } = req.body;
  const db = getDb();
  const users = db.collection('users');

  const user = await users.findOne({ email });
  if (!user)
    return res.status(400).json({ message: 'Недействительные учетные данные' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({ message: 'Недействительные учетные данные' });

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
}

module.exports = { register, login, getAllUsers };
