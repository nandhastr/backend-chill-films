import { create, getAll, getById, update, remove } from "./crudService.js";

export async function getOrders() {
    return getAll("`order`");
}

export async function getOrder(id) {
    return getById("`order`", id);
}

export async function createOrder(data) {
    const { user_id, paket_id, tgl_order, kode_order, status  } = data;
    return create("`order`", ["user_id", "paket_id", "tgl_order", "kode_order", "status"], [user_id, paket_id, tgl_order, kode_order, status, ]);
}


export async function updateOrder(id, data) {
    const { user_id, paket_id, tgl_order, kode_order, status,  } = data;
    return update("`order`", id, {user_id, paket_id, tgl_order, kode_order, status, });
}

export async function deleteOrder(id) {
    return remove("`order`", id);
}

