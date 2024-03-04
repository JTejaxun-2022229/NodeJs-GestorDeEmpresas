import { Router } from "express";
import { check } from "express-validator";
import { login } from "./auth.controller.js";
import { validationFields } from "../middlewares/validation-fields.js";

const router = Router();

router.post(
    '/login',
    [
        check('email', 'This email is invalid').isEmail(),
        check('password', 'Password is neccesary').not().isEmpty(),
        validationFields,
    ],
    login
);

export default router;