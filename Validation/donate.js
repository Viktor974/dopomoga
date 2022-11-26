import { body } from "express-validator";

export const donateValidation = [
    body('name', 'Введите заголовок').isLength({ min: 3 }).isString(),
    body('text', 'Введите text').isLength({ min: 3 }).isString(),
];