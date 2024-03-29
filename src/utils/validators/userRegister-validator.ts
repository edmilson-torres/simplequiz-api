import * as Yup from 'yup';

const schema = Yup.object().shape({
    email: Yup.string()
        .email('Must be a valid email')
        .required('Email is required'),
    name: Yup.string()
        .min(2, 'Name must be longer than 2 characters')
        .max(255, 'Name must be less than 255 characters long')
        .required('name is required'),
    password: Yup.string()
        .min(6, 'Password must be longer than 6 characters')
        .max(255, 'Password must be less than 255 characters long')
        .required('Password is required')
});

interface UserRegisterValidatorProtocol {
    email: string;
    name: string;
    password: string;
}

async function userRegisterValidator(form: UserRegisterValidatorProtocol) {
    const result = await schema.isValid(form);
    const error = await schema
        .validate(form, { abortEarly: false })
        .catch((err) => err.errors);

    if (!result) {
        throw new Error(error);
    }

    return result;
}

export default userRegisterValidator;
