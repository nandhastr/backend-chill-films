import jwt from "jsonwebtoken";

const AuthMiddlewareVerifyToken = (req, res, next) => {
    const header = req.headers["authorization"];
    const token = header && header.split(' ')[1];

    if (token == null) {
        return res.status(401).send({msg: "Autentikasi gagal" });
    };
    
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => { 

        if (err) {
            return res.status(403).send({msg: "forbidden" });
        }
        req.email = decoded.email;
        next();
    })
}

export default AuthMiddlewareVerifyToken;