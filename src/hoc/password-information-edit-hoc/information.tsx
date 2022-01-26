import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSWRConfig } from "swr";
import { EditInformationComponent } from "../../components/profile-edit/information/information";
import { Owner } from "../../models";
import { updateUser } from "../../slices/authSlice";
import axios from "../../utils/axios";

interface formValue {
  name: string;
  phone: string;
  profileImage: File | string;
}

export const EditInformationHOC = ({ user }: { user: Owner | undefined }) => {
  const [image, setImage] = useState<string>(user ? user?.profileImage?.original : "");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { mutate } = useSWRConfig();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      name: user?.name,
      phone: user?.phone,
      profileImage: image,
    },
  });

  function handleImageInput(event: any) {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  }

  const EditInformation = async (formData: FormData) => {
    try {
      const response = await axios.patch(`/users/updateProfile`, formData);
      console.log("response", response.data);
      dispatch(updateUser(response.data));
      router.push(`/profile/${user?._id}`);
      mutate(`/users/${user?._id}`);
    } catch (error: any) {
      console.log(error?.response?.data.message);
      setIsSubmit(false);
      setErrorMessage(error?.response?.data.message);
    }
  };

  function formHandler(data: formValue) {
    console.log(data);
    const formBody = {
      name: data.name,
      profileImage: data.profileImage !== user?.profileImage?.original ? data.profileImage : "",
    };
    const formData = new FormData();
    Object.entries(formBody).forEach(([key, value]) => {
      if (value) {
        formData.set(key, value as string);
      }
    });
    setIsSubmit(true);
    EditInformation(formData);
  }
  return (
    <>
      <EditInformationComponent register={register} handleSubmit={handleSubmit} formHandler={formHandler} errors={errors} control={control} handleImageInput={handleImageInput} image={image} setImage={setImage} setValue={setValue} user={user} errorMessage={errorMessage} isSubmit={isSubmit} />
    </>
  );
};
