import express from "express";
import { getMovies, getMovie, createMovie, updateMovie, deleteMovie } from "../services/movieController.js";

const router = express.Router();

// Endpoint untuk mendapatkan semua film
router.get("/movies", async (req, res) => {
    try {
        const movies = await getMovies();
        res.status(200).send(movies);
    } catch (error) {
        console.error("Gagal mendapatkan data data:", error.message);
        res.status(500).send({ error: "Gagal mendapatkan data data" });
    }
});

// Endpoint untuk mendapatkan film berdasarkan ID
router.get("/movie/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const movie = await getMovie(id);

        if (!movie) {
            return res.status(404).send({ error: "undefined" });
        }

        res.status(200).send(movie);
    } catch (error) {
       console.error("Undefined:", error.message);
       res.status(500).send({ error: "undefined" });
    }
});

// Endpoint untuk menambahkan film baru
router.post("/movie", async (req, res) => {
    try {
        const { genre_id, judul, thumbnail, video, deskripsi, thn_rilis, episode, durasi, age_restriction, rating, casting, produser } = req.body;

        const movie = await createMovie({
            genre_id,
            judul,
            thumbnail,
            video,
            deskripsi,
            thn_rilis,
            episode,
            durasi,
            age_restriction,
            rating,
            casting,
            produser,
        });

        res.status(201).send({msg: "Data berhasil ditambahkan"});
    } catch (error) {
        console.error("Gagal membuat data:", error.message);
        res.status(500).send({ error: "Gagal membuat data" });
    }
});

// Endpoint untuk memperbarui data film
router.put("/movie/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { genre_id, judul, thumbnail, video, deskripsi, thn_rilis, episode, durasi, age_restriction, rating, casting, produser } = req.body;

        const updatedMovie = await updateMovie(id, {
            genre_id,
            judul,
            thumbnail,
            video,
            deskripsi,
            thn_rilis,
            episode,
            durasi,
            age_restriction,
            rating,
            casting,
            produser,
        });

        if (!updatedMovie) {
            return res.status(404).send({ error: "undefined" });
        }

        res.status(200).send({msg: "Data berhasil diperbarui"});
    } catch (error) {
        console.error("Gagal memperbarui data:", error.message);
        res.status(500).send({ error: "Gagal memperbarui data" });
    }
});

// Endpoint untuk menghapus film
router.delete("/movie/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteMovie(id);

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
