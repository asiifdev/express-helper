// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";
import config from "../config/xconfig.cjs";

const jwtAuth = (req, res, next) => {
    const token = req.headers.authorization;

    //decode token atau membaca token
    if (token) {
        jwt.verify(token.split(' ')[1], config.token_key, (err, decoded) => {
            if (err) {
                console.log(err)
                return res.status(401).json({ success: false, message: "Invalid token" });
            } else {
                console.log('Decode JWT is : ', decoded)
                req.body.userToken = {
                    id: decoded.id,
                    email: decoded.email,
                    phone_number: decoded.phone_number,
                }

                next();
            }
        })
    } else {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
}

export {
    jwtAuth
}
