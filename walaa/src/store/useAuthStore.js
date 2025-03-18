import {create} from 'zustand'
import { axiosInstace } from '../lib/axios'
import toast from  'react-hot-toast'
import axios from 'axios'

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp : false,

    isLoggingIn : false,

    isCheckingAuth:true,

    checkAuth : async() => {
        try {
            const res = await axiosInstace.get("/auth/check");

            set({authUser: res.data})
        } catch (error) {
            console.log('error in checkAuth :' , error);
            
            set({authUser:null})
        }  finally {
            set({isCheckingAuth:false})
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstace.post("/auth/signup", data);
  
    
            set({ authUser: res.data });
            toast.success("Account created successfully!");
            window.location.href = "/"; // Redirect to home page after logout

    
        } catch (error) {
            console.log("Signup Error Response:", error.response?.data);
            toast.error(error.response?.data?.message || "Signup failed!");
        } finally {
            set({ isSigningUp: false });
        }
    }
        ,
    logout : async () => {
        try {
            await axiosInstace.post("/auth/logout");
            set({authUser : null})
            toast.success("Logged out successfully!")
        } catch (error) {
            toast.error(error.response.data.message)

        }
    }, 

    login: async (data) => {
        set({isLoggingIn : true});
        try {
            const res = await axiosInstace.post("/auth/login" , data);
            set({ authUser : res.data });
            toast.success("Logged in Successfully");
            window.location.href = "/"; // Redirect to home page after logout
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIn: false });
        }
    }

}))