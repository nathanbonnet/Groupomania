const jsw = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try { 
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const {userId, isAdmin} = jsw.verify(token,'RANDOM_TOKEN_SECRET');
        if(!isAdmin || req.body.user_id !== userId) {
            throw "vous n'etes pas proprietaire de l'article !";
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({error: error || 'Requête non authentifiée !'});
    }
}