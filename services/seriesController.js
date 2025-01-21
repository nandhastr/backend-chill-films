import Series from "../model/seriesFilmModel.js";
import { create, getAll, getById, update, remove } from "./crudService.js";

export async function getSerieses() {
    return getAll(Series);
}

export async function getSeries(id) {
    return getById(Series, id);
}

export async function createSeries(data) {
    const { genre_id, judul, thumbnail, video, deskripsi, thn_rilis, durasi, parental_guidance, rating, casting, produser } = data;

    const castingString = typeof casting === "string" ? casting : JSON.stringify(casting);

    return create(
        Series,
        { genre_id, judul, thumbnail, video, deskripsi, thn_rilis, durasi, parental_guidance, rating, castingString, produser }
    );
}

export async function updateSeries(id, data) {
    const { genre_id, judul, thumbnail, video, deskripsi, thn_rilis, durasi, parental_guidance, rating, casting, produser } = data;

    const castingString = typeof casting === "string" ? casting : JSON.stringify(casting);
    return update(Series, id, {
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
    return remove(Series, id);
}
