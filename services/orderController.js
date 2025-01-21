import Order from "../model/orderModel.js";
import { create, getAll, getById, update, remove } from "./crudService.js";

export async function getOrders() {
    return getAll(Order);
}

export async function getOrder(id) {
    return getById(Order, id);
}

export async function createOrder(data) {
    const { user_id, paket_id, tgl_order, kode_order, status  } = data;
    return create(Order, { user_id, paket_id, tgl_order, kode_order, status, });
}


export async function updateOrder(id, data) {
    const { user_id, paket_id, tgl_order, kode_order, status,  } = data;
    return update(Order, id, {user_id, paket_id, tgl_order, kode_order, status, });
}

export async function deleteOrder(id) {
    return remove(Order, id);
}

