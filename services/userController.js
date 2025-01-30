import { getAll, getById, update, remove } from "./crudService.js";
import bcrypt from "bcrypt";
import User from "../model/userModel.js";
import Filter from "./query/filterData.js";
import { sortData } from "./query/sortData.js";
import searchData from "./query/searchData.js";


export const getAllUsers = async (req, res) => {
    try {
        const users = await getAll(User);
        res.status(200).send(users);
    } catch (error) {
        console.error("Gagal mendapatkan data data:", error.message);
        res.status(500).send({ error: "Gagal mendapatkan data " });
    }
}

export const getFindUser = async(criteria) => {
    try {
        const user = await User.findOne(criteria);
        return user;
    } catch (error) {
        console.error("Error fetching user:", error.message);
        throw error;
    }
}

export const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const users = await getById(User, id);
        if (!users) {
            return res.status(404).send({ error: "undefined" });
        }

        res.status(200).send( users );
    } catch (error) {
        console.error("Undefined:", error.message);
        res.status(500).send({ error: "undefined" });
    }
}

export const updateUser = async(req, res) => {
    try {
        const { fullname, username, email, password, gambar, token } = req.body;
        let hashedPassword = password;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, salt);
        }
        await update(User, id, { fullname, username, email, password : hashedPassword, gambar, token });
        res.status(200).send({ msg: "Update data berhasil" });
    } catch (error) {
        console.log("Gagal memperbarui data:", err.message);

        res.status(500).send({ error: "Gagal memperbarui data" });
    }
}

export const deleteUser = async(req, res) => {
    try {
        const id = req.params.id;
        const result = await remove(User, id);

        if (!result) {
            return res.status(404).send({ error: "Data tidak ditemukan" });
        }

        res.status(200).send({ msg: "Data berhasil dihapus" });
    } catch (error) {
        console.error("Gagal menghapus data:", error.message);
        res.status(500).send({ error: "Gagal menghapus data" });
    }
}

export const filterUser = async (req, res) => {
    try {
        const query = req.query;
        const allowedFields = ["fullname", "username"];
        const filteredData = Filter(query, allowedFields);


        const data = await User.findAll({
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

export const sortUser = async (req, res) => {
    try {
        const validSortFields = ["fullname", "username"];
        const sortField = req.query.sortBy;
        const sortOrder = req.query.order ? req.query.order.toUpperCase() : "ASC";

        const data = await getAll(User);
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

export const searchUser = async(req, res) => {
    try {
        const allowField = ["fullname", "username"];
        const query = req.query.search;

        if (!query) {
            return res.status(400).send({ msg: "Parameter search diperlukan" });
        }

        const conditions = searchData(query, allowField);

        const datas = await User.findOne({
            where: conditions,
        });
       

        if (datas.length === 0) {
            return res.status(404).send({ msg: "Data tidak ditemukan" });
        }


        return res.status(200).send({datas});
    } catch (error) {
        console.error("Error saat mencari data:", error.message);
        return res.status(500).send({ msg: "Terjadi kesalahan pada server" });
    }
}
