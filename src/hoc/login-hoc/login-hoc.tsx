import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { LoginComponent } from "../../components/login/login";
import { useDispatch } from "react-redux";
import { login } from "../../slices/authSlice";
import axios from "../../utils/axios";

interface loginData {
  phoneNumber: "string";
  password: "string";
}

export const LoginHOC = () => {
  const [submit, setSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched", reValidateMode: "onBlur" });

  const loginHandler = async (data: loginData) => {
    setSubmit(true);
    try {
      const response = await axios.post("/auth/login", {
        username: data.phoneNumber,
        password: data.password,
      });
      if (response.data) {
        router.push("/");
        console.log(response.data);
        dispatch(login(response.data));

        setErrorMessage("");
        reset();
      }
    } catch (error: any) {
      console.log(error?.response?.data.message);
      setErrorMessage(error?.response?.data.message);
      setSubmit(false);
    }
  };

  useEffect(() => {
    router.prefetch("/");
  }, []);

  return <LoginComponent register={register} handleSubmit={handleSubmit} loginHandler={loginHandler} errors={errors} submit={submit} setSubmit={setSubmit} isSubmitting={isSubmitting} errorMessage={errorMessage} />;
};
