import * as Yup from 'yup';

const schema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Name must be longer than 2 characters')
        .max(255, 'Name must be less than 255 characters long'),
    role: Yup.mixed().oneOf(['admin', 'user'])
});

async function userUpdateValidator(form: Object) {
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
