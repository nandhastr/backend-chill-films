import episodeMovie from "../model/episodeMovieModel.js";
import { create, getAll, getById, update, remove } from "./crudService.js";

export async function getMovies() {
    return getAll(episodeMovie);
}

export async function getMovie(id) {
    return getById(episodeMovie, id);
}

export async function createMovie(data) {
    const { genre_id, judul, thumbnail, video, deskripsi, thn_rilis, episode, durasi, age_restriction, rating, casting, produser } = data;

    const castingString = typeof casting === "string" ? casting : JSON.stringify(casting);

    return create(
        episodeMovie,{genre_id, judul, thumbnail, video, deskripsi, thn_rilis, episode, durasi, age_restriction, rating, castingString, produser}
    );
}

export async function updateMovie(id, data) {
    const { genre_id, judul, thumbnail, video, deskripsi, thn_rilis, episode, durasi, age_restriction, rating, casting, produser } = data;

    const castingString = typeof casting === "string" ? casting : JSON.stringify(casting); 
    return update(episodeMovie, id, {
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
}

export async function deleteMovie(id) {
    return remove(episodeMovie, id);
}
