import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { CreateAccountComponent } from "../../components/create-account/create-account";
import { UserData } from "../../models";
import { addUserData } from "../../slices/signupSlice";
import axios from "../../utils/axios";

export const CreateAccountHOC = () => {
  const [image, setImage] = useState<string>();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    control,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UserData>({
    mode: "onBlur",
  });

  function handleImageInput(event: any) {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  }
  const toOtp = async (data: UserData) => {
    try {
      const response = await axios.post("/otp/send/", {
        phone: data.phone,
      });
      console.log(response.data);
      if (response) {
        dispatch(
          addUserData({
            name: data.name,
            password: data.password,
            phone: data.phone,
            profileImage: data.profileImage,
            email: data.email,
          })
        );
        setErrorMessage("");
        router.push("/otp");
      }
    } catch (error: any) {
      console.log(error?.response?.data?.message[0]);
      setErrorMessage(error?.response?.data?.message);
      setIsSubmit(false);
    }
  };

  console.log("error", errorMessage);
  const formHandler = async (data: UserData) => {
    setIsSubmit(true);
    toOtp(data);
  };
  return <CreateAccountComponent register={register} handleSubmit={handleSubmit} control={control} errors={errors} formHandler={formHandler} handleImageInput={handleImageInput} image={image} setImage={setImage} getValues={getValues} setValue={setValue} errorMessage={errorMessage} isSubmit={isSubmit} />;
};
