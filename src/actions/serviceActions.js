import axios from "axios";
import { apiEndpoints } from "@/constants/constants";

export const getServiceListings = async (params) => {
  const response = await axios.get(apiEndpoints.serviceListing, {
    headers: { "Content-Type": "application/json" },
    params,
  });
  return response.data;
};

export const createService = async (serviceData) => {
  const token = localStorage.getItem("authToken");
  const formData = new FormData();
  
  Object.keys(serviceData).forEach(key => {
    formData.append(key, serviceData[key]);
  });

  const response = await axios.post(apiEndpoints.createService, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getServiceDetails = async (serviceId) => {
  const response = await axios.get(apiEndpoints.serviceDetails(serviceId));
  return response.data;
};
