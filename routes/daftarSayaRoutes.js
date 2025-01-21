import express from "express";
import { getsDaftarSaya, getDaftarSaya, createDaftarSaya, updateDaftarSaya, deleteDaftarSaya } from "../services/daftarSayaController.js";

const router = express.Router();

// Endpoint untuk mendapatkan semua daftar_saya
router.get("/daftar_saya", async (req, res) => {
    try {
        const daftar_saya = await getsDaftarSaya();
        res.status(200).send(daftar_saya);
    } catch (error) {
        console.error("Gagal mendapatkan data :", error.message);
        res.status(500).send({ error: "Gagal mendapatkan data data" });
    }
});

// Endpoint untuk mendapatkan daftar_saya berdasarkan ID
router.get("/daftar_saya/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const daftar_saya = await getDaftarSaya(id);

        if (!daftar_saya) {
            return [res.status(404).send({ error: "undefined" })];
        }

        res.status(200).send(daftar_saya);
    } catch (error) {
       console.error("Undefined:", error.message);
       res.status(500).send({ error: "undefined" });
    }
});

// Endpoint untuk menambahkan daftar_saya baru
router.post("/daftar_saya", async (req, res) => {
    try {
        const { user_id, movie_id, series_id } = req.body;
      
        const daftar_saya = await createDaftarSaya({ user_id, movie_id, series_id });

        
        res.status(201).send({msg: "Data berhasil ditambahkan"});
    } catch (error) {
        console.error("Gagal membuat data:", error.message);
        res.status(500).send({ error: "Gagal membuat data" });
    }
});

// enpoint untuk update
router.put("/daftar_saya/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { user_id, movie_id, series_id } = req.body;

        const updateddaftar_saya = await updateDaftarSaya(id, { user_id, movie_id, series_id });

        if (!updateddaftar_saya) {
            return res.status(404).send({ error: "undefined" });
        }

        res.status(200).send({msg: "Data berhasil diperbarui"});
    } catch (error) {
        console.error("Gagal memperbarui data:", error.message);
        res.status(500).send({ error: "Gagal memperbarui data" });
    }
});

// Endpoint untuk menghapus film
router.delete("/daftar_saya/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteDaftarSaya(id);

        if (!result) {
            return res.status(404).send({ error: "undefined" });
        }

        res.status(200).send({msg: "Data berhasil dihapus"});
    } catch (error) {
        console.error("Gagal menghapus data:", error.message);
         res.status(404).send({ error: error.message });
    }
});

export default router;
