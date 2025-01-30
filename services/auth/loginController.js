import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User  from "../../model/userModel.js";
import { update } from "../crudService.js";

dotenv.config();

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validasi input
        if ( !email || !password) {
            return res.status(400).send({ msg: " email, dan password wajib diisi" });
        }

        // Ambil pengguna berdasarkan email
        const user = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        // Jika pengguna tidak ditemukan
        if (!user) {
            return res.status(400).send({ msg: "Email belum terdaftar" });
        }

        // Cek password
        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) {
            return res.status(400).send({ msg: "Password salah" });
        }

        const userId = user.id; 

        const accessToken = jwt.sign({ userId,  email: user.email }, process.env.ACCESS_TOKEN, {
            expiresIn: "30m",
        });

        const refreshToken = jwt.sign({ userId,  email: user.email }, process.env.REFRESH_TOKEN, {
            expiresIn: "1d",
        });

        await update(User, userId, {
            token: refreshToken,
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).send({msg: "Login berhasil", accessToken });
    } catch (error) {
        res.status(500).send({ msg: `Terjadi kesalahan: ${error.message}` });
    }
};
 export default Login;