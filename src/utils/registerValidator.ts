import * as Yup from 'yup';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
  name: Yup.string()
    .min(2, 'name min chars is 2')
    .max(255)
    .required('name is required'),
  password: Yup.string()
    .min(6, 'password min chars is 6')
    .max(255)
    .required('password is required')
});

async function registerValidator(form: Object): Promise<boolean | string> {
  const result = await schema.isValid(form);
  const error = await schema.validate(form).catch((err) => err.errors);

  if (!result) {
    return error.toString();
  }

  return result;
}

export default registerValidator;
