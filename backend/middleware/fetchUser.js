const jwt = require('jsonwebtoken');
const JWT_SECRET = "Amanisagoodb$oy";

const fetchUser = (req, res, next) => {
    // Get the user from jwt token and add id to req obj
    const token = req.header('auth-token');
    if(!token){
        // 401 -> Access denied
        res.status(401).send({error: "Please authenticate using a valid token"});
    }
    
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next(); // this will call the next middleware
    } 
    catch (error) {
        res.status(401).send({error: "Please authenticate using a valid token"}); 
    }
}

module.exports = fetchUser;