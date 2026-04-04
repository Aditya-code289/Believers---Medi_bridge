import { Router } from 'express';
import * as auditController from '../controller/audit.controller.js'

const auditRouter = Router();

// GET /api/audit/:id
auditRouter.get('/:id', auditController.getAuditHistory);

export default auditRouter;
