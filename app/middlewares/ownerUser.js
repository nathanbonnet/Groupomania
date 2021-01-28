const jsw = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try { 
        const token = req.headers.authorization.split(" ")[1];
        const {userId, isAdmin} = jsw.verify(token,'RANDOM_TOKEN_SECRET');
        if (req.params.userId && (isAdmin || parseInt(req.params.userId) === userId)) {
            next();
        } else {
            throw "vous ne pouvez pas modifier quelqu'un d'autre que vous !";
        }
    } catch (error) {
        res.status(401).json({error: error || 'Requête non authentifiée !'});
    }
}