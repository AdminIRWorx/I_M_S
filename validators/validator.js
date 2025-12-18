import {body, validationResult, param} from 'express-validator'; // middleware for Express.js to validate and sanitise incoming user input

const idValidator = [
    param('id')
    .isMongoId().withMessage((value, {req}) => req.t('bookNotFound')) // t is for translation. bookNotFound is for translation key
];

const createValidator = [ // validates posts
    body('bookName')
    .notEmpty().withMessage((value, {req}) => req.t('bookNameRequired'))
    .isLength({min: 5, max: 100}).withMessage((value, {req}) => req.t('bookNameLength')),
    body('stockCount')
    .notEmpty().withMessage((value, {req}) => req.t('stockCountRequired'))
    .isInt({min: 1}).withMessage((value, {req}) => req.t('stockCountLength')),
    body('price')
    .notEmpty().withMessage((value, {req}) => req.t('priceRequired'))
    .isFloat({min: 1, max: 1000}).withMessage((value, {req}) => req.t('priceLength')),
    body('image')
    .notEmpty().withMessage((value, {req}) => req.t('imageRequired'))
    .isURL().withMessage((value, {req}) => req.t('validImageUrl'))
];

const updateValidator = [ // validates gets, puts, deletes
    body('bookName')
    .optional()
    .isLength({min: 5, max: 100}).withMessage((value, {req}) => req.t('bookNameLength')),
    body('stockCount')
    .optional()
    .isInt({min: 1}).withMessage((value, {req}) => req.t('stockCountLength')),
    body('price')
    .optional()
    .isFloat({min: 1, max: 1000}).withMessage((value, {req}) => req.t('priceLength')),
    body('image')
    .optional()
    .isURL().withMessage((value, {req}) => req.t('validImageUrl'))
];

const handleValidationError = (req, res, next) => { // handles errors for all
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    next(); // after if statements are met, continue to the next route handler
}

export default {idValidator, createValidator, updateValidator, handleValidationError};
