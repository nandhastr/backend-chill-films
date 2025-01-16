import { create, getAll, getById, update, remove } from "./crudService.js";

export async function getGenres() {
    return getAll("genre");
}

export async function getGenre(id) {
    return getById("genre", id);
}

export async function createGenre(data) {
    const { nama_genre } = data;
    return create("genre", ["nama_genre"], [nama_genre]);
}

export async function updateGenre(id, data) {
    const { nama_genre } = data;
    return update("genre", id, {nama_genre});
}

export async function deleteGenre(id) {
    return remove("genre", id);
}
