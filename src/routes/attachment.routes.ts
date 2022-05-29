import express from 'express';
import { createAttachment, deleteAttachment, getFile } from '../controllers/attachment-controller';

const router = express.Router();

router.get('/:fileName', [], getFile);
// fileUpload.single('file'),
router.post('/create', [], createAttachment);

router.delete('/delete/:fileName', [], deleteAttachment);

export default router;
