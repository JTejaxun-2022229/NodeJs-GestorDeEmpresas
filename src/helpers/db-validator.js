import User from '../user/user.model.js';
export const existEmail = async (email = '') => {
    const emailExist = await User.findOne({ email });

    if (emailExist) {
        throw new Error(`Email ${email} is already registered`);
    }
}

export const existUserById = async (id = '') => {
    const userExist = await User.findById(id);

    if (!userExist) { throw new Error(`User with id: ${id} does not exist`); }
}

