
const authenticate = (req, res, next) => {
    if (!req.session.auth) {
        res.status(401).send({ message: "Not logged in" });
    } else {
        next();
    }
}

module.exports = {
    authenticate
}