import express from "express";
import { getUsers, getUser, createUser, updateUser, deleteUser } from "../services/userService.js";

const router = express.Router();


// Endpoint untuk mendapatkan semua user
router.get("/users", async (req, res) => {
    try {
        const user = await getUsers();
        res.status(200).send(user);
    } catch (error) {
        console.error("Gagal mendapatkan data data:", error.message);
        res.status(500).send({ error: "Gagal mendapatkan data data" });
    }
});

// Endpoint untuk mendapatkan user berdasarkan ID
router.get("/user/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const user = await getUser(id);

        if (!user) {
            return res.status(404).send({ error: "undefined" });
        }

        res.status(200).send(user);
    } catch (error) {
        console.error("Gagal mendapatkan data:", error.message);
        res.status(500).send({ error: "Gagal mendapatkan data" });
    }
});

// Endpoint untuk menambahkan user baru
router.post("/user", async (req, res) => {
    try {
        const { username, email, password, gambar } = req.body;
console.log(req.body);

         if (!username || !email || !password || !gambar) {
             return res.status(400).send({ error: "Semua field harus diisi" });
         }
        const user = await createUser({ username, email, password, gambar });

        res.status(201).send(user);
    } catch (error) {
        console.error("Gagal membuat data:", error.message);
        res.status(500).send({ error: "Gagal membuat data" });
    }
});

// enpoint untuk update
router.put("/user/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { username, email, password, gambar } = req.body;


        const updateduser = await updateUser(id, { username, email, password, gambar });

        if (!updateduser) {
            return res.status(404).send({ error: "undefined" });
        }

        res.status(200).send(updateduser);
    } catch (error) {
        console.error("Gagal memperbarui data:", error.message);
        res.status(500).send({ error: "Gagal memperbarui data" });
    }
});



// Endpoint untuk menghapus film
router.delete("/user/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteUser(id);

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
