import mongoose from 'mongoose';
import * as Yup from 'yup';

const schema = Yup.object().shape({
    userId: Yup.string().required('userId is required'),
    password: Yup.string()
        .min(6, 'Password must be longer than 6 characters')
        .max(255, 'Password must be less than 255 characters long')
        .required('Password is required'),
    token: Yup.string().required('Token is required')
});

async function tokenValidator(userId: string, password: string, token: string) {
    const validObjectId = mongoose.isValidObjectId(userId);
    if (!validObjectId) {
        throw new Error('invalid credentials');
    }
    const result = await schema.isValid({ userId, password, token });
    const error = await schema
        .validate({ userId, password, token })
        .catch((err) => err.errors);

    if (!result) {
        throw new Error(error[0]);
    }

    return result;
}

export default tokenValidator;
