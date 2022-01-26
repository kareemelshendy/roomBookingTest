import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { OTPComponent } from "../../components/otp/otp";
import { login } from "../../slices/authSlice";
import { RootState } from "../../store/store";
import axios from "../../utils/axios";

export interface otpBody {
  phone: string;
  otp: string;
}
export const OTPHOC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter();
  const userData = useSelector((state: RootState) => state.signup.user);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  console.log(userData);

  const vrifyOTP = async (otpBody: otpBody) => {
    try {
      const response = await axios.post("/otp/verify", otpBody);
      console.log("otpverfied:", response.data);
      signup();
    } catch (error: any) {
      setErrorMessage(error?.response?.data.message);
      setIsSubmit(false);
    }
  };

  const signup = async () => {
    const userBody = new FormData();
    Object.entries(userData).forEach(([key, value]) => {
      if (value) {
        userBody.set(key, value);
      }
    });
    try {
      const userRes = await axios.post("/auth/signup", userBody);
      if (userRes.data) {
        dispatch(login(userRes.data));
      }
      router.push("/");
    } catch (error: any) {
      console.log(error?.response?.data.message);
    }
  };

  const formHandler = async (data: any) => {
    const otp = `${data.otp1}${data.otp2}${data.otp3}${data.otp4}`;
    const otpBody = {
      phone: userData.phone,
      otp: otp,
    };
    setIsSubmit(true);
    vrifyOTP(otpBody);
  };
  return <OTPComponent register={register} handleSubmit={handleSubmit} errors={errors} formHandler={formHandler} errorMessage={errorMessage} isSubmit={isSubmit} />;
};
