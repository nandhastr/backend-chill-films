import express from "express";
import { getUsers, getUser, createUser, updateUser, deleteUser } from "../services/userController.js";

const router = express.Router();


// Endpoint untuk mendapatkan semua user
router.get("/users", async (req, res) => {
    try {
        const user = await getUsers();
        res.status(200).send(user);
    } catch (error) {
        console.error("Gagal mendapatkan data data:", error.message);
        res.status(500).send({ error: "Gagal mendapatkan data " });
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

        res.status(200).send({data: user});
    } catch (error) {
       console.error("Undefined:", error.message);
       res.status(500).send({ error: "undefined" });
    }
});

// Endpoint untuk menambahkan data baru
router.post("/user", async (req, res) => {
    try {
        const { fullname, username, email, password, gambar, token } = req.body;
// console.log(req.body);

        const user = await createUser({ fullname, username, email, password, gambar, token });

        console.log("Data berhasil ditambahkan");
        res.status(201).send({msg: "Data berhasil ditambahkan"});
    } catch (error) {
        console.error("Gagal membuat data:", error.message);
        res.status(500).send({ error: "Gagal membuat data" });
    }
});

// enpoint untuk update
router.put("/user/:id", async (req, res) => {
    try {
        const id = req.params.id; 
        const { fullname, username, email, password, gambar, token } = req.body;

       
        const updatedUser = await updateUser(id, {
            fullname,
            username,
            email,
            password,
            gambar,
            token,
        });

        if (!updatedUser) {
            return res.status(404).send({ error: "undefined" });
        }
        res.status(200).send({msg: "Update data berhasil"}); 
    } catch (error) {
        console.error("Gagal memperbarui data:", error.message);
        res.status(500).send({ error: "Gagal memperbarui data" });
    }
});





// Endpoint untuk menghapus 
router.delete("/user/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteUser(id);

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
