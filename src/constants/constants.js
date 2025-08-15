const registerToken = import.meta.env.VITE_REGISTER_TOKEN;
const baseUrl = import.meta.env.VITE_API_SERVICE_BASE_URL;

const apiEndpoints = {
  // Authentication Endpoints
  signUp: `${baseUrl}/api/v1/Auth/SignUp`,
  signIn: `${baseUrl}/api/v1/Auth/SignIn`,
  verifyOTP: `${baseUrl}/api/v1/Auth/VerifyOTP`,
  signInWithGoogle: `${baseUrl}/api/v1/Google/OAuth`,
  forgetPassword: `${baseUrl}/api/v1/ForgetPassword`,
  resetPassword: `${baseUrl}/api/v1/ResetPassword`,

  // Master Endpoints
  universityMaster: `${baseUrl}/api/v1/UniversityListMaster`,
  serviceCategoryListMaster: `${baseUrl}/api/v1/ServiceCategoryListMaster`,

  // Service Endpoints
  serviceListing: `${baseUrl}/api/v1/Services/List`,
  createService: `${baseUrl}/api/v1/Services/Create`,
  serviceDetails: (id) => `${baseUrl}/api/v1/Services/Details/${id}`,
};

export { registerToken, baseUrl, apiEndpoints };
