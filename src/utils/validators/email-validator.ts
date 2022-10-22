import * as Yup from 'yup';

const schema = Yup.object().shape({
    email: Yup.string()
        .email('Must be a valid email')
        .required('Email is required')
});

async function emailValidator(email: string) {
    const result = await schema.isValid({ email });
    const error = await schema.validate({ email }).catch((err) => err.errors);

    if (!result) {
        throw new Error(error);
    }

    return result;
}

export default emailValidator;
