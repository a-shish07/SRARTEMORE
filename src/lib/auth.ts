import api from "../lib/api";

export const registerUser = (
  full_name: string,
  email: string,
  password: string
) => {
  return api.post("/register", {
    full_name,
    email,
    password,
  });
};

export const loginUser = (
  email: string,
  password: string
) => {
  return api.post("/login", {
    email,
    password,
  });
};