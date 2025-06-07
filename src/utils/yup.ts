import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const schema = yup.object().shape({
    fullName: yup
    .string()
    // .min(3, "Full Name must be at least 3 characters")
    // .max(50, "Full Name cannot exceed 50 characters")
    .required("Full Name is required"),

    email: yup
      .string()
      .email("Invalid email format") 
      .required("Email is required"), 
      password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
    //   .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    //   .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    //   .matches(/\d/, "Password must contain at least one number")
    //   .matches(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&)")
      .required("Password is required"),
      confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  
  });