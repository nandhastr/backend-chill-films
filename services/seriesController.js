import Series from "../model/seriesFilmModel.js";
import { create, getAll, getById, update, remove } from "./crudService.js";
import Filter from "./query/filterData.js";
import { sortData } from "./query/sortData.js";
import searchData from "./query/searchData.js";

export const getSerieses =  async(req, res) =>{
try {
    const data = await getAll(Series);
    if (!data) {
        return res.status(404).send({ error: "Undefined" });
    }
    res.status(200).send(data);
} catch (error) {
     console.error("Gagal mendapatkan data data:", error.message);
     res.status(500).send({ error: "Gagal mendapatkan data data" });
}
}

export const getSeries =  async(req, res)=> {
    try {
        const id = req.params.id;
        const series = await getById(Series, id);
        if (!series) {
            return res.status(404).send({ error: "undefined" });
        }

        res.status(200).send(series);
    } catch (error) {
        console.error("Undefined:", error.message);
        res.status(500).send({ error: "undefined" });
    }
}

export const createSeries = async(req, res) => {
    try {
        const { genre_id, judul, thumbnail, video, deskripsi, thn_rilis, durasi, parental_guidance, rating, casting, produser } = req.body;

    const castingString = typeof casting === "string" ? casting : JSON.stringify(casting);

    const data = await create(Series, { genre_id, judul, thumbnail, video, deskripsi, thn_rilis, durasi, parental_guidance, rating, castingString, produser }
        );
        if (!data) {
            res.status(404).send({ error: "undefined" });
        }
        res.status(200).send({msg: "Data berhasil ditambahkan"});
    } catch (error) {
        console.error("Gagal membuat data:", error.message);
        res.status(500).send({ error: "Gagal membuat data" });        
    }
}

export const updateSeries =  async(req, res)=> {
    try {
        const id = req.params.id;
     const { genre_id, judul, thumbnail, video, deskripsi, thn_rilis, durasi, parental_guidance, rating, casting, produser } = req.body;

     const castingString = typeof casting === "string" ? casting : JSON.stringify(casting);
     const updatedData =  await update(Series, id, {
         genre_id,
         judul,
         thumbnail,
         video,
         deskripsi,
         thn_rilis,
         durasi,
         parental_guidance,
         rating,
         casting: castingString,
         produser,
     });
       if (!updatedData) {
           return res.status(404).send({ error: "undefined" });
       }
       res.status(200).send({ msg: "Data berhasil diperbarui" });
   } catch (error) {
       console.error("Gagal memperbarui data:", error.message);
       res.status(500).send({ error: "Gagal memperbarui data" });
    
   }
}

export const deleteSeries =  async(req, res)=>  {
    try {
        const id = req.params.id;
        const result = await remove(Series, id);

        if (!result) {
            return res.status(404).send({ error: "undefined" });
        }

        res.status(200).send(result);
    } catch (error) {
        console.error("Gagal menghapus data:", error.message);
        res.status(404).send({ error: error.message });
    }
}



export const filterSeries = async (req, res) => {
    try {
        const allowedFields = ["genre_id", "judul", "thn_rilis", "durasi", "rating", "casting", "produser"];
        const filteredData = Filter(req.query, allowedFields);

        const data = await Series.findAll({
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

export const sortSeries = async (req, res) => {
    try {
        const validSortFields = [""];
        const sortField = req.query.sortBy;
        const sortSeries = req.query.Series ? req.query.Series.toUpperCase() : "ASC";

        const data = await getAll(Series);
        if (!data || data.length === 0) {
            return res.status(404).send({ msg: "Data tidak ditemukan" });
        }

        const sortedData = sortData(data, sortField, sortSeries, validSortFields);

        return res.status(200).send({ data: sortedData });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).send({ msg: "Terjadi kesalahan pada server" });
    }
};

export const searchSeries = async (req, res) => {
    try {
        const allowField = ["genre_id", "judul", "thn_rilis", "durasi", "rating", "casting", "produser"];
        const query = req.query.search;

        if (!query) {
            return res.status(400).send({ msg: "Parameter search diperlukan" });
        }

        const conditions = searchData(query, allowField);

        const datas = await Series.findOne({
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

