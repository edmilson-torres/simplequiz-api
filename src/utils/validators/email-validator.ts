import * as Yup from 'yup';

const schema = Yup.object().shape({
    email: Yup.string()
        .email('Must be a valid email')
        .required('Email is required')
});

async function emailValidator(form: Object) {
    const result = await schema.isValid(form);
    const error = await schema.validate(form).catch((err) => err.errors);

    if (!result) {
        throw new Error(error)
    }

    return result;
}

export default emailValidator;
