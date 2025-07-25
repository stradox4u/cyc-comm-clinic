// routes.ts or routes.js (for easy reuse)
export const authPaths = {
  patient: {
    login: "/auth/patient/login",
    signup: "/auth/patient/signup",
    forgotPassword: "/auth/patient/forgot-password",
    resetPassword: "/auth/patient/reset-password", // optional
  },
  provider: {
    login: "/auth/provider/login",
    signup: "/auth/provider/signup",
    forgotPassword: "/auth/provider/forgot-password",
    resetPassword: "/auth/provider/reset-password", // optional
  },
};
