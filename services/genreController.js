import { create, getAll, getById, update, remove } from "./crudService.js";
import Genre from "../model/genreModel.js";

export async function getGenres() {
    return getAll(Genre);
}

export async function getGenre(id) {
    return getById(Genre, id);
}

export async function createGenre(data) {
    const { nama_genre } = data;
    return create(Genre, {nama_genre});
}

export async function updateGenre(id, data) {
    const { nama_genre } = data;
    return update(Genre, id, {nama_genre});
}

export async function deleteGenre(id) {
    return remove(Genre, id);
}
