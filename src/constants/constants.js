const registerToken = import.meta.env.VITE_REGISTER_TOKEN;
const baseUrl = import.meta.env.VITE_API_SERVICE_BASE_URL;

const apiEndpoints = {
  // Authentication Endpoints
  signUp: `${baseUrl}/api/v1/Auth/SignUp`,
  signIn: `${baseUrl}/api/v1/Auth/SignIn`,
  verifyOTP: `${baseUrl}/api/v1/Auth/VerifyOTP`,
  signInWithGoogle: `${baseUrl}/api/v1/Google/OAuth`,
  generateOTP: `${baseUrl}/api/v1/Auth/GenerateOTP`,
  resetPassword: `${baseUrl}/api/v1/Auth/ResetPassword`,

  // Master Endpoints
  universityMaster: `${baseUrl}/api/v1/UniversityListMaster`,
  serviceCategoryListMaster: `${baseUrl}/api/v1/ServiceCategoryListMaster`,

  // Service Endpoints
  serviceListing: `${baseUrl}/api/v1/Services/Get/Listing`,
  createService: `${baseUrl}/api/v1/Services/Create`,
  serviceDetails: (id) => `${baseUrl}/api/v1/Services/Details/${id}`,

  // User Endpoints
  updateProfile: `${baseUrl}/api/v1/User/Update/Profile`,
};

const YEAR_IN_SCHOOL = {
  FRESHMAN: "Freshman",
  SOPHOMORE: "Sophomore",
  JUNIOR: "Junior",
  SENIOR: "Senior",
  GRADUATE: "Graduate",
};

const CONTACT_PREFERENCES = {
  PHONE: "Phone",
  EMAIL: "Email",
};

const OTP_TYPES = {
  EMAIL_VERIFICATION: "email_verification",
  FORGET_PASSWORD: "forget_password",
};

export { registerToken, baseUrl, apiEndpoints, YEAR_IN_SCHOOL, CONTACT_PREFERENCES, OTP_TYPES };
