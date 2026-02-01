import axios from "axios";
import { apiEndpoints } from "@/constants/constants";

export const updateUser = async (payload) => {
  const response = await axios.patch(apiEndpoints.updateProfile, payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
