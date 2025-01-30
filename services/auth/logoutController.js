import User from "../../model/userModel.js";

const Logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(204); 

        const user = await User.findOne({
            where: {
                token: refreshToken,
            },
        });

        if (!user) return res.sendStatus(401); 

        const userId = user.id;

        await User.update(
            { token: null },
            {
                where: {
                    id: userId,
                },
            }
        );

        res.clearCookie("refreshToken"); 
        return res.status(200).send({ msg: "Logout berhasil" }); 
    } catch (error) {
        console.error(error);
        return res.sendStatus(500); 
    }
};

export default Logout;
