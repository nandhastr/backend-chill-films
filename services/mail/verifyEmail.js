import User from "../../model/userModel.js";
import { update } from "../crudService.js";
import { getFindUser } from "../userController.js";

export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;
        if (!token) {
            return res.status(400).send({ error: "Invalid verification token" });
        }


        const user = await getFindUser({ where: { token } });

        if (!user) {
            return res.status(404).send({ error: "Invalid token atau token sudah digunakan" });
        }


         await update(User, user.id, { token: null });

        res.status(200).send({ message: "Email berhasil diverifikasi" });
    } catch (error) {
        console.log("🚨 Error saat memverifikasi email:", error.message);
        res.status(500).send({ error: "Terjadi kesalahan pada server." });
    }
};

export default verifyEmail;
