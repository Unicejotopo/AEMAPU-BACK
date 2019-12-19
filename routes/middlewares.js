const jwt = require('jwt-simple');
const moment = require('moment');

const checkToken = (req, res, next) => {

    console.log(req.headers)
    // Compruebo si la cabecera viene incluida en la petición
    if (!req.headers['user-token']) {
        return res.json({ error: 'Tienes que incluir la cabecera user-token' })
    }

    const token = req.headers['user-token'];
    let payload = null;
    try {
        payload = jwt.decode(token, process.env.TOKEN_KEY)
    } catch (err) {
        return res.json({ error: 'El token es inválido' });
    };

    if (moment().unix() > payload.expiresAt) {
        return res.json({ error: 'El token está caducado. Pide otro' })
    }

    req.usuarioId = payload.userId

    next();
};

module.exports = {
    checkToken: checkToken
}