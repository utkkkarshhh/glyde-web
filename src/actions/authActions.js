import axios from "axios";
import { apiEndpoints } from "@/constants/constants";

export const registerUser = async (payload) => {
  const response = await axios.post(apiEndpoints.signUp, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const loginUser = async (payload) => {
  const response = await axios.post(apiEndpoints.signIn, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const requestOtp = async (identifier) => {
  const response = await axios.post(
    apiEndpoints.forgetPassword,
    { identifier },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

export const resendOtp = async (identifier) => {
  return requestOtp(identifier);
};

export const verifyOTP = async (payload) => {
  const response = await axios.post(apiEndpoints.verifyOTP, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const resetPassword = async (payload) => {
  const response = await axios.patch(apiEndpoints.resetPassword, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};
