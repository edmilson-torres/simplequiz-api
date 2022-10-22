import * as Yup from 'yup';

const schema = Yup.object().shape({
    id: Yup.string().length(24, 'Invalid Id'),
    name: Yup.string()
        .min(2, 'Name must be longer than 2 characters')
        .max(255, 'Name must be less than 255 characters long'),
    role: Yup.mixed().oneOf(['admin', 'user'])
});

interface UserUpdateValidatorProtocol {
    id?: string;
    name?: string;
    role?: string;
}
async function userUpdateValidator(form: UserUpdateValidatorProtocol) {
    const result = await schema.isValid(form);
    const error = await schema
        .validate(form, { abortEarly: false })
        .catch((err) => err.errors);

    if (!result) {
        throw new Error(error);
    }

    return result;
}

export default userUpdateValidator;
