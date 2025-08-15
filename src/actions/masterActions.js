import axios from "axios";
import { apiEndpoints } from "@/constants/constants";

export const getUniversityMaster = async () => {
  console.log(apiEndpoints.universityMaster)
  const response = await axios.get(apiEndpoints.universityMaster, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const getServiceCategories = async () => {
  const response = await axios.get(apiEndpoints.serviceCategoryListMaster, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};
