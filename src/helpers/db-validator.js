import User from '../user/user.model.js';
import Company from '../company/company.model.js';

export const existEmail = async (email = '') => {
    const emailExist = await User.findOne({ email });

    if (emailExist) {
        throw new Error(`Email ${email} is already registered`);
    }
}

export const existName = async (name = '') => {
    const nameExist = await Company.findOne({ name });

    if (nameExist) {
        throw new Error(`Name ${name} is already registered`);
    }
}

export const existEmailC = async (email = '') => {
    const emailExist = await Company.findOne({ email });

    if (emailExist) {
        throw new Error(`Email ${email} is already registered`);
    }
}

export const existAddress = async (address = '') => {
    const addressExist = await Company.findOne({ address });

    if (addressExist) {
        throw new Error(`Address ${address} is already registered`);
    }
}

export const existPhone = async (phone = '') => {
    const phoneExist = await Company.findOne({ phone });

    if (phoneExist) {
        throw new Error(`Phone ${phone} is already registered`);
    }
}

