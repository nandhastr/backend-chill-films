import User from "../../model/userModel.js";
import jwt from "jsonwebtoken";

const refreshToken = async (req, res) => {
    try {
        
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(401);

        const user = await User.findAll({
            where: {
                token: refreshToken,
            },
        });

        if (!user[0]) return res.sendStatus(403);

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
            if (err) return res.sendStatus(403);
            const userId = user[0].id;  
            const name = user[0].name;
            const email = user[0].email;
            const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN, {
                expiresIn: "15s",
            });
            res.json({ accessToken });
        });

        
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: `Terjadi kesalahan: ${error.message}` });
    }
};

export default refreshToken;
