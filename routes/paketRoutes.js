import express from "express";
import { getPakets, getPaket, createPaket, updatePaket, deletePaket } from "../services/paketService.js";

const router = express.Router();


// Endpoint untuk mendapatkan semua paket
router.get("/pakets", async (req, res) => {
    try {
        const paket = await getPakets();
        res.status(200).send(paket);
    } catch (error) {
        console.error("Gagal mendapatkan data data:", error.message);
        res.status(500).send({ error: "Gagal mendapatkan data data" });
    }
});

// Endpoint untuk mendapatkan paket berdasarkan ID
router.get("/paket/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const paket = await getPaket(id);

        if (!paket) {
            return res.status(404).send({ error: "undefined" });
        }

        res.status(200).send(paket);
    } catch (error) {
        console.error("Gagal mendapatkan data:", error.message);
        res.status(500).send({ error: "Gagal mendapatkan data" });
    }
});

// Endpoint untuk menambahkan paket baru
router.post("/paket", async (req, res) => {
    try {
        const { nama, harga, benefit, deskripsi } = req.body;
console.log(req.body);

         if (!nama || !harga || !benefit || !deskripsi) {
             return res.status(400).send({ error: "Semua field harus diisi" });
         }
        const paket = await createPaket({ nama, harga, benefit, deskripsi });

        res.status(201).send(paket);
    } catch (error) {
        console.error("Gagal membuat data:", error.message);
        res.status(500).send({ error: "Gagal membuat data" });
    }
});

// enpoint untuk update
router.put("/paket/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { nama, harga, benefit, deskripsi } = req.body;


        const updatedpaket = await updatePaket(id, { nama, harga, benefit, deskripsi });

        if (!updatedpaket) {
            return res.status(404).send({ error: "undefined" });
        }

        res.status(200).send(updatedpaket);
    } catch (error) {
        console.error("Gagal memperbarui data:", error.message);
        res.status(500).send({ error: "Gagal memperbarui data" });
    }
});



// Endpoint untuk menghapus film
router.delete("/paket/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deletePaket(id);

        if (!result) {
            return res.status(404).send({ error: "undefined" });
        }

        res.status(200).send(result);
    } catch (error) {
        console.error("Gagal menghapus data:", error.message);
        res.status(500).send({ error: "Gagal menghapus data" });
    }
});

export default router;
