import * as yup from "yup";

export const signInsSchema = yup.object().shape({
  email: yup.string().email("Invalide email").required("Email is required"),
  password: yup
    .string()
    .required()
    .min(8, { message: "Password must be must be 8 characters" }),
  //   name: yup.string().required("Email is required"),
});
