function authenticat(req, res, next) {
    console.log("Authentication...");
    next();
}
module.exports = authenticat;