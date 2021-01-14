const jsw = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try { 
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const {userId, isAdmin} = jsw.verify(token,'RANDOM_TOKEN_SECRET');
        if(req.body.userId && req.body.userId !== userId) {
            throw "User id non valable !";
        } else if (!isAdmin) {
            throw "Vous n'avez pas acces !";
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({error: error || 'Requête non authentifiée !'});
    }
}