import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { NewPasswordComponent } from "../../components/new-password/new-password";

export const NewPasswordHOC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  function formHandler(data: any) {
    console.log(data);
    reset();

    setTimeout(() => {
      router.push("/login");
    }, 2000);
  }
  return <NewPasswordComponent register={register} handleSubmit={handleSubmit} errors={errors} formHandler={formHandler} getValues={getValues} />;
};
