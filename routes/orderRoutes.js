import express from "express";
import { getOrders, getOrder, createOrder, updateOrder, deleteOrder } from "../services/orderService.js";

const router = express.Router();

// Endpoint untuk mendapatkan semua order
router.get("/orders", async (req, res) => {
    try {
        const order = await getOrders();
        res.status(200).send(order);
    } catch (error) {
        console.error("Gagal mendapatkan data data:", error.message);
        res.status(500).send({ error: "Gagal mendapatkan data data" });
    }
});

// Endpoint untuk mendapatkan order berdasarkan ID
router.get("/order/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const order = await getOrder(id);

        if (!order) {
            return res.status(404).send({ error: "undefined" });
        }

        res.status(200).send(order);
    } catch (error) {
        console.error("Gagal mendapatkan data:", error.message);
        res.status(500).send({ error: "Gagal mendapatkan data" });
    }
});

// Endpoint untuk menambahkan order baru
router.post("/order", async (req, res) => {
    try {
        const { user_id, paket_id, tgl_order, kode_order, status } = req.body;

        const order = await createOrder({ user_id, paket_id, tgl_order, kode_order, status });

        res.status(201).send(order);
    } catch (error) {
        console.error("Gagal membuat data:", error.message);
        res.status(500).send({ error: "Gagal membuat data" });
    }
});

// enpoint untuk update
router.put("/order/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { user_id, paket_id, tgl_order, kode_order, status } = req.body;

        const updatedorder = await updateOrder(id, { user_id, paket_id, tgl_order, kode_order, status });

        if (!updatedorder) {
            return res.status(404).send({ error: "undefined" });
        }

        res.status(200).send(updatedorder);
    } catch (error) {
        console.error("Gagal memperbarui data:", error.message);
        res.status(500).send({ error: "Gagal memperbarui data" });
    }
});

// Endpoint untuk menghapus film
router.delete("/order/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteOrder(id);

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
