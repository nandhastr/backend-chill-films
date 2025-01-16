import { create, getAll, getById, update, remove } from "./crudService.js";

export async function getMovies() {
    return getAll("episode_movie");
}

export async function getMovie(id) {
    return getById("episode_movie", id);
}

export async function createMovie(data) {
    const { genre_id, judul, thumbnail, video, deskripsi, thn_rilis, episode, durasi, age_restriction, rating, casting, produser } = data;

    const castingString = typeof casting === "string" ? casting : JSON.stringify(casting);

    return create(
        "episode_movie",
        ["genre_id", "judul", "thumbnail", "video", "deskripsi", "thn_rilis", "episode", "durasi", "age_restriction", "rating", "casting", "produser"],
        [genre_id, judul, thumbnail, video, deskripsi, thn_rilis, episode, durasi, age_restriction, rating, castingString, produser]
    );
}

export async function updateMovie(id, data) {
    const { genre_id, judul, thumbnail, video, deskripsi, thn_rilis, episode, durasi, age_restriction, rating, casting, produser } = data;

    const castingString = typeof casting === "string" ? casting : JSON.stringify(casting); 
    return update("episode_movie", id, {
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
    return remove("episode_movie", id);
}
