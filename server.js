// index.js

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

// ===== FIX __dirname =====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());

// ===== STATIC FILE =====
app.use(express.static(path.join(__dirname, "public")));

// ===== DATABASE DUMMY =====
const siswa = [
  {
    nisn: "12345",
    nama: "Budi Santoso",
    status: "LULUS"
  },
  {
    nisn: "67890",
    nama: "Siti Nurhaliza",
    status: "LULUS"
  },
  {
    nisn: "11111",
    nama: "Andi Saputra",
    status: "TIDAK LULUS"
  }
];

// ===== API =====
app.post("/api/cek", (req, res) => {

  const { nisn } = req.body;

  // validasi kosong
  if(!nisn){
    return res.status(400).json({
      error: true,
      message: "NISN wajib diisi"
    });
  }

  // cari data
  const data = siswa.find(
    v => v.nisn === nisn
  );

  // kalau tidak ada
  if(!data){
    return res.status(404).json({
      error: true,
      message: "Data tidak ditemukan"
    });
  }

  // kirim hasil
  res.json({
    success: true,
    data
  });

});

// ===== HANDLE INDEX =====
app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "index.html")
  );
});

// ===== START SERVER =====
app.listen(PORT, () => {

  console.log(`
╔══════════════════════════════╗
║   WEB KELULUSAN AKTIF 🚀    ║
╠══════════════════════════════╣
║ URL : http://localhost:${PORT}
╚══════════════════════════════╝
  `);

});