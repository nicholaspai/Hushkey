
const authenticate = (req, res, next) => {
    console.log(req.session)
    if (!req.session.auth) {
        res.status(401).send({ message: "Not logged in" });
    } else {
        next();
    }
}

module.exports = {
    authenticate
}