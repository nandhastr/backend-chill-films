import { create, getAll, getById, update, remove } from "./crudService.js";
import Paket from "../model/paketModel.js";

export async function getPakets() {
    return getAll(Paket);
}

export async function getPaket(id) {
    return getById(Paket, id);
}

export async function createPaket(data) {
    const { nama, harga, benefit, deskripsi } = data;
    const benefitString = Array.isArray(benefit) ? JSON.stringify(benefit) : benefit;
    return create(Paket, { nama, harga, benefitString, deskripsi });
}


export async function updatePaket(id, data) {
    const { nama, harga, benefit, deskripsi } = data;
    const benefitString = Array.isArray(benefit) ? JSON.stringify(benefit) : benefit;
    return update(Paket, id, { nama, harga, benefit:benefitString, deskripsi });
}

export async function deletePaket(id) {
    return remove(Paket, id);
}
