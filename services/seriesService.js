import { create, getAll, getById, update, remove } from "./crudService.js";

export async function getSerieses() {
    return getAll("series_film");
}

export async function getSeries(id) {
    return getById("series_film", id);
}

export async function createSeries(data) {
    const { genre_id, judul, thumbnail, video, deskripsi, thn_rilis, durasi, parental_guidance, rating, casting, produser } = data;

    const castingString = typeof casting === "string" ? casting : JSON.stringify(casting);

    return create(
        "series_film",
        ["genre_id", "judul", "thumbnail", "video", "deskripsi", "thn_rilis", "durasi", "parental_guidance", "rating", "casting", "produser"],
        [genre_id, judul, thumbnail, video, deskripsi, thn_rilis, durasi, parental_guidance, rating, castingString, produser]
    );
}

export async function updateSeries(id, data) {
    const { genre_id, judul, thumbnail, video, deskripsi, thn_rilis, durasi, parental_guidance, rating, casting, produser } = data;

    const castingString = typeof casting === "string" ? casting : JSON.stringify(casting);
    return update("series_film", id, {
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
}

export async function deleteSeries(id) {
    return remove("series_film", id);
}
