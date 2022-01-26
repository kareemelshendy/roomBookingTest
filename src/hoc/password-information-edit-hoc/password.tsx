import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { EditPasswordComponent } from "../../components/profile-edit/password/password";
import { logout } from "../../slices/authSlice";
import axios from "../../utils/axios";

interface formValues {
  password: string;
  newPassword: string;
}

export const EditPasswordHOC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isSubmit, setIsSubmit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    mode: "onBlur",
  });

  const updatePassword = async (data: formValues) => {
    console.log(data);
    try {
      const response = await axios.patch(`/users/updateProfile`, data);
      console.log(response.data);
      if (response.data) {
        dispatch(logout());
        destroyCookie(null, "userToken");
        router.push("/auth");
        reset();
      }
    } catch (error: any) {
      console.log(error?.respose?.data.message);
      setIsSubmit(false);
    }
  };
  function formHandler(data: formValues) {
    const finalBody = {
      password: data.password,
      newPassword: data.newPassword,
    };
    setIsSubmit(true);
    updatePassword(finalBody);
  }
  return (
    <>
      <EditPasswordComponent register={register} handleSubmit={handleSubmit} errors={errors} formHandler={formHandler} getValues={getValues} isSubmit={isSubmit} />
    </>
  );
};
