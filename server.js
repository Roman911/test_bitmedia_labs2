const fs = require("fs");
const exists = fs.existsSync('data.db');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const createTables = require('./createTabels');
const db = require('./users');

if (!exists) {
  createTables()
}

app.get('/users', async (req, res) => {
  const limit = await req.query.limit;
  const offset = await req.query.offset;
  const users = await db.getAllUsers(limit, offset);
  res.status(200).json({ users })
})

app.get('/user', async (req, res) => {
  const id = await req.query.id;
  const user = await db.getUser(Number(id));
  res.status(200).json({ user })
})

const PORT = 3005

async function start() {
  try {
    app.listen(PORT || 5000, () => {
      console.log(`Server: http://localhost:${PORT}`)
    })
  } catch (e) {
    console.log('Server error', e.message)
    process.exit(1)
  }
}

start().then(r => console.log(r))

