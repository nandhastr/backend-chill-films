import daftarSaya from "../model/daftarSayaModel.js";
import { create, getAll, getById, update, remove } from "./crudService.js";

export async function getsDaftarSaya() {
    return getAll(daftarSaya);
}

export async function getDaftarSaya(id) {
    return getById(daftarSaya, id);
}

export async function createDaftarSaya(data) {
    const { user_id, movie_id, series_id } = data;
    return create(daftarSaya, {user_id, movie_id, series_id});
}

export async function updateDaftarSaya(id, data) {
    const { user_id, movie_id, series_id } = data;
    return update(daftarSaya, id, { user_id, movie_id, series_id });
}

export async function deleteDaftarSaya(id) {
    return remove(daftarSaya, id);
}
