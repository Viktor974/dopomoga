import { body } from "express-validator";

export const organizationlidation = [
    body('name', 'Введите заголовок').isLength({ min: 3 }).isString(),
];