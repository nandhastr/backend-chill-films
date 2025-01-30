import Order from "../model/orderModel.js";
import { create, getAll, getById, update, remove } from "./crudService.js";
import Filter from "./query/filterData.js";
import { sortData } from "./query/sortData.js";
import searchData from "./query/searchData.js";


export const getOrders = async(req, res) => {
    try {
        const data = await getAll(Order);
        res.status(200).send(data);
    } catch (error) {
        console.error("Gagal mendapatkan data data:", error.message);
        res.status(500).send({ error: "Gagal mendapatkan data data" });
    }
}

export const getOrder = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await getById(Order, id);

        if (!order) {
            return res.status(404).send({ error: "Undefined" });
        }

        res.status(200).send(order);
    } catch (error) {
       console.error("Undefined:", error.message);
       res.status(500).send({ error: "Undefined" });
    }
}

export const createOrder =  async(req, res) => {
   
    try {
        const { user_id, paket_id, tgl_order, kode_order, status } = req.body;

        const newData = await create(Order, { user_id, paket_id, tgl_order, kode_order, status, });

        if (!newData) {
            res.status(404).send({ error: "undefined" });        
        }

        res.status(201).send({msg: "Data berhasil ditambahkan"});
    } catch (error) {
        console.error("Gagal membuat data:", error.message);
        res.status(500).send({ error: "Gagal membuat data" });
    }
}


export const updateOrder = async(req, res) => {

     try {
        const id = req.params.id;
        const { user_id, paket_id, tgl_order, kode_order, status } = req.body;

        const updatedData = await update(Order, id, { user_id, paket_id, tgl_order, kode_order, status, });

        if (!updatedData) {
            return res.status(404).send({ error: "undefined" });
        }

        res.status(200).send({msg: "Data berhasil diperbarui"});
    } catch (error) {
        console.error("Gagal memperbarui data:", error.message);
        res.status(500).send({ error: "Gagal memperbarui data" });
    }
}

export const deleteOrder = async(req, res) => {
    try {
        const id = req.params.id;
        const result = await remove(Order, id);

        if (!result) {
            return res.status(404).send({ error: "undefined" });
        }

        res.status(200).send({msg: "Data berhasil dihapus"});
    } catch (error) {
        console.error("Gagal menghapus data:", error.message);
        res.status(404).send({ error: error.message });
    }
}



export const filterOrder = async (req, res) => {
    try {
        const allowedFields = ["user_id", "paket_id", "tgl_order", "kode_order", "status"]; 
        const filteredData = Filter(req.query, allowedFields);

        const data = await Order.findAll({
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

export const sortOrder = async (req, res) => {
    try {
        const validSortFields = ["user_id", "paket_id", "tgl_order", "kode_order", "status"];
        const sortField = req.query.sortBy;
        const sortOrder = req.query.order ? req.query.order.toUpperCase() : "ASC";

        const data = await getAll(Order);
        if (!data || data.length === 0) {
            return res.status(404).send({ msg: "Data tidak ditemukan" });
        }

        const sortedData = sortData(data, sortField, sortOrder, validSortFields);

        return res.status(200).send({ data: sortedData });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).send({ msg: "Terjadi kesalahan pada server" });
    }
};

export const searchOrder = async (req, res) => {
    try {
        const allowField = ["user_id", "paket_id", "tgl_order", "kode_order", "status"];    
        const query = req.query.search;

        if (!query) {
            return res.status(400).send({ msg: "Parameter search diperlukan" });
        }

        const conditions = searchData(query, allowField);

        const datas = await Order.findOne({
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
