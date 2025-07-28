const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  nama: String,
  nomorWA: String,
  email: String,
  kota: String,
  jenisKelamin: String,
  usia: Number,
  tanggalDaftar: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Registration', registrationSchema);
