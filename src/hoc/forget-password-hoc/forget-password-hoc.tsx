import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ForgetPasswordComponent } from "../../components/forget-password/forget-password";

export const ForgetPasswordHOC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  function formHandler(data: any) {
    console.log(data);
    reset();
    router.push("/otp");
  }
  return <ForgetPasswordComponent register={register} handleSubmit={handleSubmit} errors={errors} formHandler={formHandler} />;
};
