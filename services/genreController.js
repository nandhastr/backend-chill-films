import { create, getAll, getById, update, remove } from "./crudService.js";
import Genre from "../model/genreModel.js";
import Filter from "./query/filterData.js";
import { sortData } from "./query/sortData.js";
import searchData from "./query/searchData.js";


export const getGenres = async (req, res) => {
    try {
        const data = await getAll(Genre);
        res.status(200).send(data);
    } catch (error) {
        console.error("Gagal mendapatkan data genre:", error.message);
        res.status(500).send({ error: "Gagal mendapatkan data data" });
    }
};

export const getGenre = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await getById(Genre, id);

        if (!data) {
            return res.status(404).send({ error: "undefined" });
        }
        res.status(200).send(data);
    } catch (error) {
        console.error("Undefined:", error.message);
        res.status(500).send({ error: error.message });
    }
};

export const createGenre = async (req, res) => {
    try {
        const { nama_genre } = req.body;
        if (!nama_genre || nama_genre.trim() === "") {
            return res.status(400).send({ error: "Nama genre tidak boleh kosong" });
        }
        await create(Genre, { nama_genre });
        res.status(201).send({ msg: "Data berhasil ditambahkan" });
    } catch (error) {
        console.error("Gagal membuat data:", error.message);
        res.status(500).send({ error: "Gagal membuat data" });
    }
};

export const updateGenre = async (req, res) => {
    try {
        const id = req.params.id;
        const { nama_genre } = req.body;
        if (!nama_genre) {
            return res.status(400).send({ error: "nama genre tidak boleh kosong" });
        }

        const updatedData = await update(Genre, id, { nama_genre });

        if (!updatedData) {
            return res.status(404).send({ error: error.message });
        }
        res.status(200).send({ msg: "Data berhasil diperbarui" });
    } catch (error) {
        console.error("Gagal memperbarui data:", error.message);
        res.status(500).send({ error: "Gagal memperbarui data" });
    }
};

export const deleteGenre = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await remove(Genre, id);

        if (!result) {
            return res.status(404).send({ error: "undefined" });
        }
        res.status(200).send({ msg: "Data berhasil dihapus" });
    } catch (error) {
        console.error("Gagal menghapus data:", error.message);
        res.status(404).send({ error: error.message });
    }
};




export const filterGenre = async (req, res) => {
    try {
        const allowedFields = ["nama_genre"];
        const filteredData = Filter(req.query, allowedFields);

        const data = await Genre.findAll({
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

export const sortGenre = async (req, res) => {
    try {
        const validSortFields = ["nama_genre"];
        const sortField = req.query.sortBy;
        const sortOrder = req.query.order ? req.query.order.toUpperCase() : "ASC";

        const data = await getAll(Genre);
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

export const searchGenre = async (req, res) => {
    try {
        const allowField = ["nama_genre"];
        const query = req.query.search;

        if (!query) {
            return res.status(400).send({ msg: "Parameter search diperlukan" });
        }

        const conditions = searchData(query, allowField);

        const datas = await Genre.findOne({
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
