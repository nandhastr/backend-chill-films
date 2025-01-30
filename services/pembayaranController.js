import Pembayaran from "../model/pembayaranModel.js";
import { create, getAll, getById, update, remove } from "./crudService.js";
import Filter from "./query/filterData.js";
import { sortData } from "./query/sortData.js";
import searchData from "./query/searchData.js";

export const getPays = async(req, res) =>{
    try {
        const pay = await getAll(Pembayaran);
        res.status(200).send(pay);
    } catch (error) {
        console.error("Gagal mendapatkan data data:", error.message);
        res.status(500).send({ error: "Gagal mendapatkan data data" });
    }
}

export const getPay = async(req, res) =>{
    try {
        const id = req.params.id;
        const data = await getById(Pembayaran, id);

        if (!data) {
            return res.status(404).send({ error: "undefined" });
        }

        res.status(200).send(data);
    } catch (error) {
        console.error("Undefined:", error.message);
        res.status(500).send({ error: "undefined" });
    }
}

export const createPay = async(req, res) =>{
    try {
        const { user_id, order_id, amount, tgl_bayar, pay_method, status, kode_voucher } = req.body;

        const newData = await create(Pembayaran, { user_id, order_id, amount, tgl_bayar, pay_method, status, kode_voucher });
        if (!newData) {
            return res.status(404).send({ error: "undefined" });
    }
        res.status(201).send({msg: "Data berhasil ditambahkan"});
    } catch (error) {
        console.error("Gagal membuat data:", error.message);
        res.status(500).send({ error: "Gagal membuat data" });
    }
}


export const updatePay =  async(req, res) =>{
  
    try {
        const id = req.params.id;
        const { user_id, order_id, amount, tgl_bayar, pay_method, status, kode_voucher } = req.body;

        const updatedpay = await update(Pembayaran, id, { user_id, order_id, amount, tgl_bayar, pay_method, status, kode_voucher });

        if (!updatedpay) {
            return res.status(404).send({ error: "undefined" });
        }

        res.status(200).send({msg: "Data berhasil diperbarui"});
    } catch (error) {
        console.error("Gagal memperbarui data:", error.message);
        res.status(500).send({ error: "Gagal memperbarui data" });
    }
}

export const deletePay = async(req, res) =>{
      try {
        const id = req.params.id;
        const result = await remove(Pembayaran, id);

        if (!result) {
            return res.status(404).send({ error: "undefined" });
        }

        res.status(200).send(result);
    } catch (error) {
        console.error("Gagal menghapus data:", error.message);
         res.status(404).send({ error: error.message });
    }
}



export const filterPembayaran = async (req, res) => {
    try {
        const allowedFields = ["user_id", "order_id", "amount", "tgl_bayar", "pay_method", "status"];
        const filteredData = Filter(req.query, allowedFields);

        const data = await Pembayaran.findAll({
            where: filteredData,
        });

        if (!data || data.length === 0) {
            return res.status(404).send({ msg: "Data tidak ditemukan" });
        }

        return res.status(200).send({ data: data });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).send({ msg: "Terjadi kesalahan pada server" });
    }
};

export const sortPembayaran = async (req, res) => {
    try {
        const validSortFields = [""];
        const sortField = req.query.sortBy;
        const sortPembayaran = req.query.Pembayaran ? req.query.Pembayaran.toUpperCase() : "ASC";

        const data = await getAll(Pembayaran);
        if (!data || data.length === 0) {
            return res.status(404).send({ msg: "Data tidak ditemukan" });
        }

        const sortedData = sortData(data, sortField, sortPembayaran, validSortFields);

        return res.status(200).send({ data: sortedData });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).send({ msg: "Terjadi kesalahan pada server" });
    }
};

export const searchPembayaran = async (req, res) => {
    try {
        const allowField = ["user_id", "order_id", "amount", "tgl_bayar", "pay_method", "status"];
        const query = req.query.search;

        if (!query) {
            return res.status(400).send({ msg: "Parameter search diperlukan" });
        }

        const conditions = searchData(query, allowField);

        const datas = await Pembayaran.findOne({
            where: conditions,
        });

        if (datas.length === 0) {
            return res.status(404).send({ msg: "Data tidak ditemukan" });
        }

        return res.status(200).send({ datas });
    } catch (error) {
        console.error("Error saat mencari data:", error.message);
        return res.status(500).send({ msg: "Terjadi kesalahan pada server" });
    }
};

