import express from 'express';
import { createTemplates, deleteTemplates, getTemplates, showTemplates, updateTemplates } from '../controllers/TemplateController.js';

var router = express.Router();

router.post("/", createTemplates)
router.get("/", getTemplates)
router.get("/:id", showTemplates)
router.patch("/:id", updateTemplates)
router.delete("/:id", deleteTemplates)

export { router }