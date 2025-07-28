// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const Registration = require('./models/Registration');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Biar bisa diakses dari domain lain (e.g. frontend di hosting lain)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB error:', err));

// API Endpoint
app.post('/register', async (req, res) => {
  try {
    const newUser = new Registration(req.body);
    await newUser.save();
    res.status(200).json({ message: 'Registrasi berhasil' });
  } catch (error) {
    console.error('❌ Error saving to DB:', error);
    res.status(500).json({ message: 'Gagal menyimpan data' });
  }
});

app.get('/', (req, res) => {
  res.send('🟢 Server berjalan.');
});

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
