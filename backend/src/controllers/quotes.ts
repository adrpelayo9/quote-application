import express, {
    NextFunction,
    Request,
    RequestHandler,
    Response,
} from 'express';
import { Quote } from '../models/models.js';
import mongoose from 'mongoose';

export const getQuotes: RequestHandler = async (req, res) => {
    const quotes = await Quote.find();

    if (!quotes) {
        console.log('No Quotes.');
        return res.status(400).json({ error: 'No Quotes.' });
    }

    res.json(quotes);
};

export const createQuote: RequestHandler = async (req, res) => {
    const { id, username } = req.user;
    const quote = req.body;

    if (!mongoose.isValidObjectId(id) || !id) {
        console.log('Invalid ID.');
        return res.status(400).json({ error: 'Invalid ID.' });
    }
    
    if (!quote) {
        console.log('Error creating new Quote.');
        return res.status(404).json({ error: 'Error creating new Quote.' });
    }

    try {
        const newQuote = new Quote({
            title: quote.title,
            message: quote.message,
            author: quote.author,
            tags: quote.tags,
            userID: id,
            username: username,
        });
        await newQuote.save();

        res.status(201).json(newQuote);
    } catch (error) {
        console.log('Internal error creating new Quote:', error);
        res.status(500).json({
            error: 'Internal error with creating new Quote.',
        });
    }
};

export const getMyQuotes: RequestHandler = async (req, res) => {
    const id = req.user.id;

    if (!mongoose.isValidObjectId(id) || !id) {
        console.log('Invalid ID.');
        return res.status(400).json({ error: 'Invalid ID.' });
    }

    try {
        const quote = await Quote.find({ userID: id });

        if (quote.length === 0) {
            console.log('Quote not found.');
            return res.status(404).json({ error: 'Quote not found.' });
        }

        res.status(200).json(quote);
    } catch (error) {
        console.log('Internal error fetching Quote:', error);
        res.status(500).json({ error: 'Internal error fetching User Quotes.' });
    }
};

export const getQuoteByUsername: RequestHandler = async (req, res) => {
    const quoteUser = req.params.username;

    if (!quoteUser) {
        console.log('Invalid Username.');
        return res.status(400).json({ error: 'Invalid Username.' });
    }

    try {
        const quote = await Quote.find({ username: quoteUser });

        if (quote.length === 0) {
            console.log('Quote not found.');
            return res.status(404).json({ error: 'Quote not found.' });
        }

        res.status(200).json(quote);
    } catch (error) {
        console.log('Internal error finding Quote with Username:', error);
        res.status(500).json({
            error: 'Internal error finding Quote with Username.',
        });
    }
};

export const getQuoteByUserId: RequestHandler = async (req, res) => {
    const quoteUserId = req.params.id;

    if (!mongoose.isValidObjectId(quoteUserId)) {
        console.log('Invalid ID.');
        return res.status(400).json({ error: 'Invalid ID.' });
    }

    try {
        const quote = await Quote.find({ userID: quoteUserId });

        if (quote.length === 0) {
            console.log('Quote not found.');
            return res.status(404).json({ error: 'Quote not found.' });
        }

        res.status(200).json(quote);
    } catch (error) {
        console.log('Internal error finding Quote with User ID:', error);
        res.status(500).json({
            error: 'Internal error finding Quote with User ID.',
        });
    }
};

export const getQuoteByAuthor: RequestHandler = async (req, res) => {
    const quoteAuthor = req.params.author;

    if (!quoteAuthor) {
        console.log('Invalid Author.');
        return res.status(400).json({ error: 'Invalid Author.' });
    }

    try {
        const quote = await Quote.find({ author: quoteAuthor });

        if (quote.length === 0) {
            console.log('Quote not found');
            return res.status(404).json({ error: 'Quote not found.' });
        }

        res.status(200).json(quote);
    } catch (error) {
        console.log('Internal error fetching Quote with Author:', error);
        res.status(500).json({
            error: 'Internal error finding Quote with Author.',
        });
    }
};

export const getQuoteByTags: RequestHandler = async (req, res) => {
    const quoteTags = req.body;

    if (!quoteTags || !quoteTags.tags || quoteTags.tags.length === 0) {
        console.log('Tag not selected.');
        return res.status(400).json({ error: 'Tag not selected.' });
    }

    try {
        let quote;

        if (quoteTags.tags.length === 1) {
            quote = await Quote.find({
                tags: { $in: quoteTags.tags },
            });
        } else {
            quote = await Quote.find({
                tags: { $all: quoteTags.tags },
            });
        }

        if (quote.length === 0) {
            console.log('Quote not found with selected Tag(s).');
            return res
                .status(404)
                .json({ error: 'Quote not found with selected Tag(s).' });
        }

        res.status(200).json(quote);
    } catch (error) {
        console.log('Internal error fetching Quote:', error);
        res.status(500).json({
            error: 'Internal error finding Quote with selected Tag(s).',
        });
    }
};

export const updateQuote: RequestHandler = async (req, res) => {
    const quoteId = req.params.id;

    if (!mongoose.isValidObjectId(quoteId)) {
        console.log('Invalid ID.');
        return res.status(400).json({ error: 'Invalid ID.' });
    }

    try {
        const quote = await Quote.findOne({ _id: quoteId });

        if (!quote) {
            console.log('Quote not found.');
            return res.status(404).json({ error: 'Quote not found.' });
        }

        const updatedQuote = await quote.updateOne({
            title: req.body.title,
            message: req.body.message,
            author: req.body.author,
            tags: req.body.tags,
        });

        res.status(200).json(updatedQuote);
    } catch (error) {
        console.log('Internal error editing Quote:', error);
        res.status(500).json({ error: 'Internal error editing Quote.' });
    }
};

export const deleteQuote: RequestHandler = async (req, res) => {
    const quoteId = req.params.id;

    if (!mongoose.isValidObjectId(quoteId)) {
        console.log('Invalid ID.');
        return res.status(400).json({ error: 'Invalid ID.' });
    }

    try {
        const deletingQuote = await Quote.findOne({ _id: quoteId });

        if (!deletingQuote) {
            console.log('This Quote does not exist.');
            return res
                .status(404)
                .json({ error: 'This Quote does not exist.' });
        }

        await Quote.deleteOne({ _id: quoteId });

        res.status(200).json('Quote has been deleted.');
    } catch (error) {
        console.log('Internal error deleting Quote:', error);
        res.status(500).json({ error: 'Internal error deleting Quote.' });
    }
};

export const adminDeleteQuote: RequestHandler = async (req, res) => {
    const quoteId = req.params.id;

    if (!mongoose.isValidObjectId(quoteId)) {
        console.log('Invalid ID.');
        return res.status(400).json({ error: 'Invalid ID.' });
    }

    try {
        const deletingQuote = await Quote.findOne({ _id: quoteId });

        if (!deletingQuote) {
            console.log('This Quote does not exist.');
            return res
                .status(404)
                .json({ error: 'This Quote does not exist.' });
        }

        await Quote.deleteOne({ _id: quoteId });

        res.status(200).json('Quote has been deleted.');
    } catch (error) {
        console.log('Internal error deleting Quote:', error);
        res.status(500).json({ error: 'Internal error deleting Quote.' });
    }
};
