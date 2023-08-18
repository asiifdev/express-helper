import { privateKey } from '../config/constantConfig.js';

const authorizeService = async (req, res, next) => {
    try {
        let authorization = req.headers.private_key

        if (!authorization) {
            return res.status(403).send({ status: 403, message: 'Tidak diizinkan' });
        }
        if (authorization != privateKey) {
            return res.status(403).send({ status: 403, message: 'Invalid authorize token' });
        }
        next()
    } catch (err) {
        return res.status(403).send({ status: 403, message: 'Invalid authorize token', error: err });
    }
}

export { authorizeService }