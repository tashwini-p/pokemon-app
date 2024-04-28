require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Blacklist } = require("../schemas/blacklist.schema");

const verifyToken = async (req, res, next) => {

    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
            return res.status(401).send({"msg": "Unauthorized. Token not provided."});
        }

        const accessToken = authorizationHeader.split(" ")[1];

        const isBlacklisted = await Blacklist.findOne({ token: accessToken });
        
        if (isBlacklisted) {
            return res.status(401).send({"msg": "User is logged out. Please login again."});
        }

        const decoded = await jwt.verify(accessToken, process.env.SECRETKEY);
        console.log(decoded);
        if (decoded) {
            req.user = decoded.data;
            req.role = decoded.data.roles;
            req.id = decoded.data.id;
            req.username = decoded.data.username;
            console.log("req.id:", req.id);
            next();
        }

    } catch (error) {
        console.log(error.message);
        return res.send(error.message);
    }
}


module.exports={
    verifyToken
}