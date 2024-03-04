import { Router } from "express";
import { check } from "express-validator";
import { companyPost, companyGet, companyToExcel } from "./company.controller.js";
import { existEmailC, existName, existAddress, existPhone } from "../helpers/db-validator.js";
import { validationFields } from "../middlewares/validation-fields.js";
import { validationJWT } from "../middlewares/validation-jwt.js";

const router = Router();

router.get("/", companyGet);

router.post(
    "/",
    [
        validationJWT,
        check("name", "Name is neccesary").not().isEmpty(),
        check("name").custom(existName),
        check("email", "This is an invalid email").isEmail(),
        check("email").custom(existEmailC),
        check("address", "Address is neccesary").not().isEmpty(),
        check("address").custom(existAddress),
        check("phone", "Phone is neccesary").not().isEmpty(),
        check("phone").custom(existPhone),
        check("category", "Category is neccesary").not().isEmpty(),
        check("impactLevel", "ImpactLevel is neccesary").not().isEmpty(),
        check("yearsExperiencie", "Years of Experiencie is neccesary").not().isEmpty(),
        validationFields,
    ],
    companyPost
);

router.get(
    "/companyToExcel",
    [validationJWT],
    companyToExcel
)

export default router;
