import { create, getAll, getById, update, remove } from "./crudService.js";

export async function getPakets() {
    return getAll("paket");
}

export async function getPaket(id) {
    return getById("paket", id);
}

export async function createPaket(data) {
    const { nama, harga, benefit, deskripsi } = data;
    const benefitString = Array.isArray(benefit) ? JSON.stringify(benefit) : benefit;
    return create("paket", ["nama", "harga", "benefit", "deskripsi"], [nama, harga, benefitString, deskripsi]);
}


export async function updatePaket(id, data) {
    const { nama, harga, benefit, deskripsi } = data;
    const benefitString = Array.isArray(benefit) ? JSON.stringify(benefit) : benefit;
    return update("paket", id, { nama, harga, benefit:benefitString, deskripsi });
}

export async function deletePaket(id) {
    return remove("paket", id);
}
