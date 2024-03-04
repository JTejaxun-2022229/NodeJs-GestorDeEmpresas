import { Router } from "express";
import { check } from "express-validator";
import { userPost } from "./user.controller.js";
import { existEmail } from "../helpers/db-validator.js"; 
import { validationFields } from "../middlewares/validation-fields.js";

const router = Router();

router.post(
    "/",[
        check("name", "Name is neccesary").not().isEmpty(),
        check("email", "This is an invalid email").isEmail(),
        check("email").custom(existEmail),
        check("password", "Password must be have 6 characters").isLength({min: 6,}),
        validationFields,
    ],
    userPost
)

export default router;