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

export const generateOtp = async (payload) => {
  const response = await axios.post(apiEndpoints.generateOTP, { email: payload.email, reason: payload.otp_type }, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
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
