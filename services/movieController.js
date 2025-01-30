import episodeMovie from "../model/episodeMovieModel.js";
import { create, getAll, getById, update, remove } from "./crudService.js";
import Filter from "./query/filterData.js";
import { sortData } from "./query/sortData.js";
import searchData from "./query/searchData.js";




export const getMovies = async(req, res)=> {
    try {
        const movies = await getAll(episodeMovie);
        res.status(200).send(movies);
    } catch (error) {
        console.error("Gagal mendapatkan data data:", error.message);
        res.status(500).send({ error: "Gagal mendapatkan data data" });
    }
}

export const getMovie =  async (req, res) => {
    try {
        const id = req.params.id;
        const data = await getById(episodeMovie, id);
        if (!data) {
            return res.status(404).send({ error: "undefined" });
        }

        res.status(200).send(data);
    } catch (error) {
        console.error("Undefined:", error.message);
        res.status(404).send({ error: error.message  });
        
    }
}

export const createMovie = async(req, res) =>  {
    try {
        const { genre_id, judul, thumbnail, video, deskripsi, thn_rilis, episode, durasi, age_restriction, rating, casting, produser } = req.body;

        const castingString = typeof casting === "string" ? casting : JSON.stringify(casting);

        const newData = await create(episodeMovie, { genre_id, judul, thumbnail, video, deskripsi, thn_rilis, episode, durasi, age_restriction, rating, castingString, produser });
        if (!newData) {
            return res.status(404).send({ error: "undefined" });
        }
        res.status(201).send({msg: "Data berhasil ditambahkan"});
    } catch (error) {
        console.error("Gagal membuat data:", error.message);
        res.status(500).send({ error: "Gagal membuat data" });
    }
}

export const updateMovie = async(req, res) => {
    try {
        const id = req.params.id;
        const { genre_id, judul, thumbnail, video, deskripsi, thn_rilis, episode, durasi, age_restriction, rating, casting, produser } = req.body;

        const castingString = typeof casting === "string" ? casting : JSON.stringify(casting);
        const updatedData = await update(episodeMovie, id, {
            genre_id,
            judul,
            thumbnail,
            video,
            deskripsi,
            thn_rilis,
            episode,
            durasi,
            age_restriction,
            rating,
            casting: castingString,
            produser,
        });
        if (!updatedData) {
            return res.status(404).send({ error: "undefined" });
        }

        res.status(200).send({msg: "Data berhasil diperbarui"});
    } catch (error) {
        console.error("Gagal memperbarui data:", error.message);
        res.status(500).send({ error: "Gagal memperbarui data" });
    }
}

export const deleteMovie = async(req, res)=> {
    try {
        const id = req.params.id;
        const result = await remove(episodeMovie, id);

        if (!result) {
            return res.status(404).send({ error: "undefined" });
        }

        res.status(200).send({ msg: "Data berhasil dihapus" });
    } catch (error) {
        console.error("Gagal menghapus data:", error.message);
        res.status(404).send({ error: error.message });
    }
}




export const filterEpisodeMovie = async (req, res) => {
    try {
        const allowedFields = ["judul","genre_id", "thn_rilis","rating", "produser"];
        const filteredData = Filter(req.query, allowedFields);

        const data = await episodeMovie.findAll({
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

export const sortEpisodeMovie = async (req, res) => {
    try {
        const validSortFields = ["judul", "genre_id", "thn_rilis", "rating", "produser"];
        const sortField = req.query.sortBy;
        const sortOrder = req.query.order ? req.query.order.toUpperCase() : "ASC";

        const data = await getAll(episodeMovie);
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

export const searchEpisodeMovie = async (req, res) => {
    try {
        const allowField = ["judul", "genre_id", "thn_rilis", "rating", "produser"];
        const query = req.query.search;

        if (!query) {
            return res.status(400).send({ msg: "Parameter search diperlukan" });
        }

        const conditions = searchData(query, allowField);

        const datas = await episodeMovie.findOne({
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
