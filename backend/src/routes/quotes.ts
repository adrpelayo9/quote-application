import express from 'express';
import * as quoteController from '../controllers/quotes.js';
import { isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', quoteController.getQuotes);
router.post('/', quoteController.createQuote);

router.get('/myquotes', quoteController.getMyQuotes)
router.get('/username/:username', quoteController.getQuoteByUsername);
router.get('/id/:id', quoteController.getQuoteByUserId);
router.get('/author/:author', quoteController.getQuoteByAuthor);
router.post('/tags', quoteController.getQuoteByTags);
router.patch('/:id', quoteController.updateQuote);
router.delete('/:id', quoteController.deleteQuote);
router.delete('/admin/:id', isAdmin, quoteController.adminDeleteQuote);

export default router;