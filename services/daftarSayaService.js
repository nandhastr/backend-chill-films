import { create, getAll, getById, update, remove } from "./crudService.js";

export async function getsDaftarSaya() {
    return getAll("daftar_saya");
}

export async function getDaftarSaya(id) {
    return getById("daftar_saya", id);
}

export async function createDaftarSaya(data) {
    const { user_id, movie_id, series_id } = data;
    return create("daftar_saya", ["user_id", "movie_id", "series_id"], [user_id, movie_id, series_id]);
}

export async function updateDaftarSaya(id, data) {
    const { user_id, movie_id, series_id } = data;
    return update("daftar_saya", id, { user_id, movie_id, series_id });
}

export async function deleteDaftarSaya(id) {
    return remove("daftar_saya", id);
}
