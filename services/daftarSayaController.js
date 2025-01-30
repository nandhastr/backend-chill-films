import daftarSaya from "../model/daftarSayaModel.js";
import { create, getAll, getById, update, remove } from "./crudService.js";
import Filter from "./query/filterData.js";
import { sortData } from "./query/sortData.js";
import searchData from "./query/searchData.js";

export const getsDaftarSaya = async(req, res)=> {
try {
    const data = await getAll(daftarSaya);
    if (!data) {
        return res.status(404).send({ error: "undefined" });
    }
    res.status(200).send(data);
} catch (error) {
    console.error("Gagal mendapatkan data :", error.message);
    res.status(500).send({ error: "Gagal mendapatkan data data" });
}
}

export const getDaftarSaya =  async(req, res)=> {
    try {
        const id = req.params.id;
        const data = await getById(daftarSaya, id);

        if (!data) {
            return [res.status(404).send({ error: "undefined" })];
        }
        res.status(200).send(data);

    } catch (error) {
        console.error("Undefined:", error.message);
        res.status(500).send({ error: "undefined" });
    }
}

export const createDaftarSaya =  async(req, res)=> {
    try {
        const { user_id, movie_id, series_id } = req.body;

        const newData = await create(daftarSaya, { user_id, movie_id, series_id });

        if (!newData) {
            res.status(404).send({ error: "undefined" });
        }

        res.status(201).send({ msg: "Data berhasil ditambahkan" });
    } catch (error) {
        console.error("Gagal membuat data:", error.message);
        res.status(500).send({ error: "Gagal membuat data" });
    }
}

export const updateDaftarSaya = async(req, res) =>{
   
    try {
        const id = req.params.id;
        const { user_id, movie_id, series_id } = req.body;

        const updatedData = await update(daftarSaya, id, { user_id, movie_id, series_id });

        if (!updatedData) {
            return res.status(404).send({ error: "undefined" });
        }

        res.status(200).send({ msg: "Data berhasil diperbarui" });
    } catch (error) {
        console.error("Gagal memperbarui data:", error.message);
        res.status(500).send({ error: "Gagal memperbarui data" });
    }
}

export const deleteDaftarSaya =  async(req, res) =>{
    try {
        const id = req.params.id;
        const result = await remove(daftarSaya, id);

        if (!result) {
            return res.status(404).send({ error: "undefined" });
        }

        res.status(200).send({ msg: "Data berhasil dihapus" });
    } catch (error) {
        console.error("Gagal menghapus data:", error.message);
        res.status(404).send({ error: error.message });
    }
}



export const filterDaftarSaya = async (req, res) => {
    try {
        const allowedFields = ["movie_id", "series_id"];
        const filteredData = Filter(req.query, allowedFields);

        const data = await daftarSaya.findAll({
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

export const sortDaftarSaya = async (req, res) => {
    try {
        const validSortFields = ["movie_id", "series_id"];
        const sortField = req.query.sortBy;
        const sortOrder = req.query.order ? req.query.order.toUpperCase() : "ASC";

        const data = await getAll(daftarSaya);
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

export const searchDaftarSaya = async (req, res) => {
    try {
        const allowField = ["movie_id", "series_id"];
        const query = req.query.search;

        if (!query) {
            return res.status(400).send({ msg: "Parameter search diperlukan" });
        }

        const conditions = searchData(query, allowField);

        const datas = await daftarSaya.findOne({
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
