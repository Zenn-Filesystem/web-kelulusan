// server.js

import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const siswa = [
  {
    nisn: "12345",
    nama: "Budi",
    status: "LULUS"
  },
  {
    nisn: "67890",
    nama: "Siti",
    status: "TIDAK LULUS"
  }
];

app.post("/api/cek", (req, res) => {

  const { nisn } = req.body;

  const data = siswa.find(v => v.nisn === nisn);

  if(!data){
    return res.json({
      error: true
    });
  }

  res.json(data);

});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});