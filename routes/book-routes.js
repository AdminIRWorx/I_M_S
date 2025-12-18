import express from 'express'; // library for simplifying and streamlining the development of server-side applications and APIs
import Book from '../models/book.js';
import myExports from '../validators/validator.js';

const router = express.Router();

router.post('/', myExports.createValidator/*call passed variables/functions using object*/, myExports.handleValidationError, async(req, res) => { // add book
    const book = new Book(req.body);
    try {
        await book.save()
        res.status(201).json({"Books": book});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

router.get('/', async (req, res) => { // get book
    try {
            const result = await Book.find();
            res.status(200).send({"Books": result});
    } catch (error) {
            res.status(400).json({error: error.message});
    }
});

router.get('/:id', myExports.idValidator, myExports.handleValidationError, async(req, res) => { // get book by ID
    try {
        const {id: bookId} = req.params;
        const book = await Book.findById(bookId);
        if(!book){ // if book doesn't exist
            res.status(404).json({error: req.t('bookNotFound')}); // t is for translation. bookNotFound is for translation key
        } else {
            res.json({"Book": book});
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});
    
router.put('/:id', myExports.idValidator, myExports.updateValidator, myExports.handleValidationError, async(req, res) => { // update book by ID
    try {
        const bookId = req.params.id;
         const result = await Book.findByIdAndUpdate(bookId, req.body, {new: true});
        res.json({message: req.t('bookUpdated'), result}); // t is for translation. bookUpdated is for translation key
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.delete('/:id', myExports.idValidator, myExports.handleValidationError, async (req, res) => { // delete book by ID
    try {
        const bookId = req.params.id;
        const result = await Book.findByIdAndDelete({_id: bookId});
        if(!result) {
            return res.status(404).json({message: req.t('bookNotFound')}); // t is for translation. bookNotFound is for translation key
        }
         res.json({message: req.t('bookDeleted'), deletedCount: result.deletedCount}); // t is for translation. bookDeleted is for translation key
    } catch (error) {
        res.status(500).json({error: error.message});
    }
    
});

export default router;