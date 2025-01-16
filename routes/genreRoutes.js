import express from "express";
import { getGenres, getGenre, createGenre, updateGenre, deleteGenre } from "../services/genreService.js";

const router = express.Router();

// Endpoint untuk mendapatkan semua genre
router.get("/genre", async (req, res) => {
    try {
        const genre = await getGenres();
        res.status(200).send(genre);
    } catch (error) {
        console.error("Gagal mendapatkan data genre:", error.message);
        res.status(500).send({ error: "Gagal mendapatkan data data" });
    }
});

// Endpoint untuk mendapatkan genre berdasarkan ID
router.get("/genre/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const genre = await getGenre(id);

        if (!genre) {
            return res.status(404).send({ error: "undefined" });
        }

        res.status(200).send(genre);
    } catch (error) {
        console.error("Gagal mendapatkan data:", error.message);
        res.status(500).send({ error: "Gagal mendapatkan data" });
    }
});

// Endpoint untuk menambahkan genre baru
router.post("/genre", async (req, res) => {
    try {
        const { nama_genre } = req.body;

        const genre = await createGenre({ nama_genre });

        res.status(201).send(genre);
    } catch (error) {
        console.error("Gagal membuat data:", error.message);
        res.status(500).send({ error: "Gagal membuat data" });
    }
});

// enpoint untuk update
router.put("/genre/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { nama_genre } = req.body;

        // console.log("Data yang diterima:", { id, nama_genre }); 

        if (!nama_genre) {
            return res.status(400).send({ error: "nama genre tidak boleh kosong" });
        }

        const updatedGenre = await updateGenre(id, { nama_genre });

        if (!updatedGenre) {
            return res.status(404).send({ error: "undefined" });
        }

        res.status(200).send(updatedGenre);
    } catch (error) {
        console.error("Gagal memperbarui data:", error.message);
        res.status(500).send({ error: "Gagal memperbarui data" });
    }
});



// Endpoint untuk menghapus film
router.delete("/genre/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteGenre(id);

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
