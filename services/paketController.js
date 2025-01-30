import { create, getAll, getById, update, remove } from "./crudService.js";
import Paket from "../model/paketModel.js";
import Filter from "./query/filterData.js";
import { sortData } from "./query/sortData.js";
import searchData from "./query/searchData.js";



export const getPakets= async(req, res)=> {
    try {
        const data = await getAll(Paket);
        res.status(200).send(data);
    } catch (error) {
        console.error("Gagal mendapatkan data data:", error.message);
        res.status(500).send({ error: "Gagal mendapatkan data data" });
    }
}

export const getPaket = async(req, res) =>{
    try {
        const id = req.params.id;
        const data = await getById(Paket, id);

        if (!data) {
            return res.status(404).send({ error: "undefined" });
        }

        res.status(200).send(data);
    } catch (error) {
       console.error("Undefined:", error.message);
       res.status(500).send({ error: "undefined" });
    }

}

export const createPaket = async(req, res) =>{
   try {
        const { nama, harga, benefit, deskripsi } = req.body;
        const benefitString = Array.isArray(benefit) ? JSON.stringify(benefit) : benefit;
       
       const newData = await create(Paket, { nama, harga, benefitString, deskripsi });

       if (!newData) {
           return res.status(404).send({ error: "undefined" });
       }    
       res.status(201).send({msg: "Data berhasil ditambahkan"});
   } catch (error) {
    console.error("Gagal membuat data:", error.message);
        res.status(500).send({ error: "Gagal membuat data" });
   }
}


export const updatePaket =  async(req, res) =>{
    try {
        const id = req.params.id;
        const { nama, harga, benefit, deskripsi } = req.body;
        const benefitString = Array.isArray(benefit) ? JSON.stringify(benefit) : benefit;
        
        const updatedData = await update(Paket, id, { nama, harga, benefit: benefitString, deskripsi });
        if (!updatedData) {
            return res.status(404).send({ error: "undefined" });
        }

        res.status(200).send({msg: "Data berhasil diperbarui"});
    } catch (error) {
        console.error("Gagal memperbarui data:", error.message);
        res.status(500).send({ error: "Gagal memperbarui data" });
    }
}

export const deletePaket = async(req, res) =>{
     try {
        const id = req.params.id;
        const result = await remove(Paket, id);

        if (!result) {
            return res.status(404).send({ error: "undefined" });
        }

        res.status(200).send({msg: "Data berhasil dihapus"});
    } catch (error) {
        console.error("Gagal menghapus data:", error.message);res.status(404).send({ error: error.message });
    }
}



export const filterPaket = async (req, res) => {
    try {
        const allowedFields = ["nama", "harga", "benefit", "deskripsi"];
        const filteredData = Filter(req.query, allowedFields);

        const data = await Paket.findAll({
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

export const sortPaket = async (req, res) => {
    try {
        const validSortFields = ["nama", "harga", "benefit", "deskripsi"];
        const sortField = req.query.sortBy;
        const sortPaket = req.query.Paket ? req.query.Paket.toUpperCase() : "ASC";

        const data = await getAll(Paket);
        if (!data || data.length === 0) {
            return res.status(404).send({ msg: "Data tidak ditemukan" });
        }

        const sortedData = sortData(data, sortField, sortPaket, validSortFields);

        return res.status(200).send({ data: sortedData });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).send({ msg: "Terjadi kesalahan pada server" });
    }
};

export const searchPaket = async (req, res) => {
    try {
        const allowField = ["nama", "harga", "benefit", "deskripsi"];
        const query = req.query.search;

        if (!query) {
            return res.status(400).send({ msg: "Parameter search diperlukan" });
        }

        const conditions = searchData(query, allowField);

        const datas = await Paket.findOne({
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
