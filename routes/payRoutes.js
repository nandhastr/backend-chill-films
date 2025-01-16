import express from "express";
import { getPays, getPay, createPay, updatePay, deletePay } from "../services/paymentService.js";

const router = express.Router();


// Endpoint untuk mendapatkan semua pay
router.get("/pays", async (req, res) => {
    try {
        const pay = await getPays();
        res.status(200).send(pay);
    } catch (error) {
        console.error("Gagal mendapatkan data data:", error.message);
        res.status(500).send({ error: "Gagal mendapatkan data data" });
    }
});

// Endpoint untuk mendapatkan pay berdasarkan ID
router.get("/pay/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const pay = await getPay(id);

        if (!pay) {
            return res.status(404).send({ error: "undefined" });
        }

        res.status(200).send(pay);
    } catch (error) {
        console.error("Gagal mendapatkan data:", error.message);
        res.status(500).send({ error: "Gagal mendapatkan data" });
    }
});

// Endpoint untuk menambahkan pay baru
router.post("/pay", async (req, res) => {
    try {
        const { user_id, order_id, amount, tgl_bayar, pay_method, status, kode_voucher } = req.body;

        const pay = await createPay({ user_id, order_id, amount, tgl_bayar, pay_method, status, kode_voucher });

        res.status(201).send(pay);
    } catch (error) {
        console.error("Gagal membuat data:", error.message);
        res.status(500).send({ error: "Gagal membuat data" });
    }
});

// enpoint untuk update
router.put("/pay/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { user_id, order_id, amount, tgl_bayar, pay_method, status, kode_voucher } = req.body;

        const updatedpay = await updatePay(id, { user_id, order_id, amount, tgl_bayar, pay_method, status, kode_voucher });

        if (!updatedpay) {
            return res.status(404).send({ error: "undefined" });
        }

        res.status(200).send(updatedpay);
    } catch (error) {
        console.error("Gagal memperbarui data:", error.message);
        res.status(500).send({ error: "Gagal memperbarui data" });
    }
});

// Endpoint untuk menghapus film
router.delete("/pay/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deletePay(id);

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

