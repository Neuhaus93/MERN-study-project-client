import * as Yup from 'yup';

const requiredError = 'This field is required';

const usernameRegex = /^[A-Za-z ]+$/g;

export const registerValidation = Yup.object({
  firstName: Yup.string()
    .required(requiredError)
    .min(2, 'Must be 2 characters or more')
    .max(20, 'Must be 20 characters or less')
    .matches(usernameRegex, 'Only letters allowed'),
  lastName: Yup.string()
    .required(requiredError)
    .min(2, 'Must be 2 characters or more')
    .max(20, 'Must be 20 characters or less')
    .matches(usernameRegex, 'Only letters allowed'),
  email: Yup.string().email('Invalid email address').required(requiredError),
  password: Yup.string()
    .min(8, 'Must be 8 characters or more')
    .max(15, 'Must be 15 characters or less')
    .required(requiredError),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required(requiredError),
});

export const loginValidation = Yup.object({
  email: Yup.string().email('Invalid email address').required(requiredError),
  password: Yup.string()
    .min(8, 'Must be 8 characters or more')
    .max(15, 'Must be 15 characters or less')
    .required(requiredError),
});

export const editProfileValidation = Yup.object({
  firstName: Yup.string()
    .min(2, 'Must be 2 characters or more')
    .max(20, 'Must be 20 characters or less')
    .matches(usernameRegex, 'Only letters allowed'),
  lastName: Yup.string()
    .min(2, 'Must be 2 characters or more')
    .max(20, 'Must be 20 characters or less')
    .matches(usernameRegex, 'Only letters allowed'),
  phoneNumber: Yup.string()
    .min(2, 'Must be 2 characters or more')
    .max(20, 'Must be 20 characters or less'),
  facebook: Yup.string()
    .min(2, 'Must be 2 characters or more')
    .max(20, 'Must be 20 characters or less'),
  linkedin: Yup.string()
    .min(2, 'Must be 2 characters or more')
    .max(20, 'Must be 20 characters or less'),
  instagram: Yup.string()
    .min(2, 'Must be 2 characters or more')
    .max(20, 'Must be 20 characters or less'),
});

export const createAdValidation = Yup.object({
  title: Yup.string()
    .required(requiredError)
    .min(3, 'Must be 3 characters or more')
    .max(80, 'Must be 80 characters or less'),
  price: Yup.string()
    .required(requiredError)
    .min(1, 'Must be 2 characters or more')
    .max(11, 'Way to expensive for us'),
  location: Yup.string().required(requiredError),
  category: Yup.string().required(requiredError),
  description: Yup.string()
    .required(requiredError)
    .min(5, 'Must be 5 characters or more')
    .max(3000, 'Must be 3000 characters or less'),
});
