const jsw = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try { 
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const {userId, isAdmin} = jsw.verify(token,'RANDOM_TOKEN_SECRET');
        if(!isAdmin || req.body.id !== userId) {
            throw "vous ne pouvez pas modifier quelqu'un d'autre que vous !";
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({error: error || 'Requête non authentifiée !'});
    }
}