import { UserData } from "@/components/auth/AuthRegister";
import axios from "./axios";

const userAPI = {
  createNewUser: async (userId: UserData) => {
    try {
      const response = await axios.post("/auth/register", userId);
      return response.data;
    } catch (error) {
      return error;
    }
  },

  verifyUser: async ({ tokenId, otp }: { tokenId: string; otp: string }) => {
    try {
      const response = await axios.post("/auth/verify", { tokenId, otp });
      return response.data;
    } catch (error) {
      return error;
    }
  },
  loginUser: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      let response = await axios.post("/auth/login", { email, password });

      return response.data;
    } catch (error) {
      return error;
    }
  },
  logoutUser: async () => {
    try {
      let response = await axios.post("/auth/logout");
      return response.data;
    } catch (error) {
      return error;
    }
  },

  forgotPasswordVerify: async (email: string) => {
    try {
      let response = await axios.post("/auth/forgotPasswordSendOtp", { email });
      return response.data;
    } catch (error) {
      return error;
    }
  },

  verifyForgotOtp: async ({
    otp,
    tokenId,
  }: {
    otp: string;
    tokenId: string;
  }) => {
    try {
      let response = await axios.post("/auth/forgotPasswordVerifyOtp", {
        otp,
        tokenId,
      });
      return response.data;
    } catch (error) {
      return error;
    }
  },

  verifyChangePassword: async ({
    password,
    tokenId,
  }: {
    password: string;
    tokenId: string;
  }) => {
    try {
      let response = await axios.post("/auth/change-forgot-password-change", {
        password,
        tokenId,
      });
      return response.data;
    } catch (error) {
      return error;
    }
  },

  resendOTP: async (tokenId: string) => {
    try {
      let response = await axios.post("/auth/resendOtp", { tokenId });
      return response.data;
    } catch (error) {
      return error;
    }
  },

  fetchTimerDate: async (tokenId: string) => {
    try {
      let response = await axios.post("/auth/get-timer-date", { tokenId });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return error;
    }
  },
};

export default userAPI;
