/**
 * @file Manages the form validation throughout the app
 * @author Jack Holden
 */

import * as yup from "yup";

/**
 * SignInEmail Screen form validation
 * - email: Checks valid email, not blank & string
 */
export const emailStepValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email address is required"),
});

/**
 * SignInPassword Screen form validation
 * - password: Checks string, min length & not blank
 */
export const passwordStepValidationSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});

/**
 * Register Screen form validation
 * - displayName: Checks string and not empty
 * - email: Checks valid email, not blank & string
 * - password: Checks string, min length & not blank
 * - cpassword: Checks string, min length, not blank & matches password.
 */
export const registerValidationSchema = yup.object().shape({
  displayName: yup.string().required("Display name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email address is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .label("Password"),
  cpassword: yup
    .string()
    .oneOf([yup.ref("password")], "Confirm password does not match")
    .required("Confirm password is required"),
});

/**
 * Change Password Screen form validation
 * - opassword: Checks string, min length and not blank
 * - npassword: Checks string, min length & not blank
 * - cnpassword: Checks string, min length, not blank & matches password.
 */
export const changePasswordValidationSchema = yup.object().shape({
  opassword: yup
    .string()
    .required("Old password is required")
    .min(8, ({ min }) => `Password must be at least ${min} characters`),
  npassword: yup
    .string()
    .required("New password is required")
    .min(8, ({ min }) => `New password must be at least ${min} characters`),
  cnpassword: yup
    .string()
    .oneOf([yup.ref("npassword")], "Confirm new password does not match")
    .required("Confirm new password is required"),
});
