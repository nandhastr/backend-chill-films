import express from "express";
import { getSerieses, getSeries, createSeries, updateSeries, deleteSeries } from "../services/seriesController.js";

const router = express.Router();

// Endpoint untuk mendapatkan semua film
router.get("/serieses", async (req, res) => {
    try {
        const serieses = await getSerieses();
        res.status(200).send(serieses);
    } catch (error) {
        console.error("Gagal mendapatkan data data:", error.message);
        res.status(500).send({ error: "Gagal mendapatkan data data" });
    }
});

// Endpoint untuk mendapatkan film berdasarkan ID
router.get("/series/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const series = await getSeries(id);

        if (!series) {
            return res.status(404).send({ error: "undefined" });
        }

        res.status(200).send(series);
    } catch (error) {
        console.error("Undefined:", error.message);
        res.status(500).send({ error: "undefined" });
    }
});

// Endpoint untuk menambahkan film baru
router.post("/series", async (req, res) => {
    try {
        const { genre_id, judul, thumbnail, video, deskripsi, thn_rilis, durasi, parental_guidance, rating, casting, produser } = req.body;

        const series = await createSeries({
            genre_id,
            judul,
            thumbnail,
            video,
            deskripsi,
            thn_rilis,
            durasi,
            parental_guidance,
            rating,
            casting,
            produser,
        });

        res.status(201).send(series);
    } catch (error) {
        console.error("Gagal membuat data:", error.message);
        res.status(500).send({ error: "Gagal membuat data" });
    }
});

// Endpoint untuk memperbarui data film
router.put("/series/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { genre_id, judul, thumbnail, video, deskripsi, thn_rilis, durasi, parental_guidance, rating, casting, produser } = req.body;

        const updatedMovie = await updateSeries(id, {
            genre_id,
            judul,
            thumbnail,
            video,
            deskripsi,
            thn_rilis,
            durasi,
            parental_guidance,
            rating,
            casting,
            produser,
        });

        if (!updatedMovie) {
            return res.status(404).send({ error: "undefined" });
        }

        res.status(200).send(updatedMovie);
    } catch (error) {
        console.error("Gagal memperbarui data:", error.message);
        res.status(500).send({ error: "Gagal memperbarui data" });
    }
});

// Endpoint untuk menghapus film
router.delete("/series/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteSeries(id);

        if (!result) {
            return res.status(404).send({ error: "undefined" });
        }

        res.status(200).send(result);
    } catch (error) {
        console.error("Gagal menghapus data:", error.message);
         res.status(404).send({ error: error.message });
    }
});

export default router;
