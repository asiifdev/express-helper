import express from 'express';
import { port, environment, serviceName } from '../config/constantConfig.js';

var router = express.Router();

// Node JS
router.get(`/api/${serviceName}/check-server`, (req, res) => {
    res.json({ message:"Health check success" }).status(200)
})

export { router }