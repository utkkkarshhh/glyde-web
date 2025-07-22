const registerToken = import.meta.env.VITE_REGISTER_TOKEN;
const baseUrl = import.meta.env.VITE_API_SERVICE_BASE_URL;

const apiEndpoints = {
  // Authentication Endpoints
  signUp: `${baseUrl}/api/v1/sign_up`,
  signIn: `${baseUrl}/api/v1/sign_in`,
  signInWithGoogle: `${baseUrl}/api/v1/Google/OAuth`,
  forgetPassword: `${baseUrl}/api/v1/ForgetPassword`,
  verifyOTP: `${baseUrl}/api/v1/VerifyOTP`,
  resetPassword: `${baseUrl}/api/v1/ResetPassword`,

  // Master Endpoints
  universityMaster: `${baseUrl}/api/v1/university_list_master`,
};

export { registerToken, baseUrl, apiEndpoints };
