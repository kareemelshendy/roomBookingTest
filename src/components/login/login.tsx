import Image from "next/image";
import { FieldValues, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

import { LoginForm } from "../login-form/login-form";
import styles from "./login.module.scss";

interface loginData {
  phoneNumber: "string";
  password: "string";
}
interface Props {
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  loginHandler: (data: loginData) => Promise<void>;
  errors: any;
  submit: boolean;
  setSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmitting: boolean;
  errorMessage: string;
}

export const LoginComponent = ({ register, handleSubmit, loginHandler, errors, submit, setSubmit, isSubmitting, errorMessage }: Props) => {
  return (
    <>
      <div className={styles.login_container}>
        <div className={styles.left}>
          <div className={styles.login_logo}>
            <Image src="/Shapeblue.png" width="66px" height="60px" alt="شعار الموقع" />
            <div className={styles.logotitle}>
              <h1 className="heading heading-3 heading-semiBold heading-blue">Room Smart</h1>
              <h3 className="heading heading-4  heading-lightGrey">Booking Room</h3>
            </div>
          </div>
          <div className={styles.formContainer}>
            <div className={styles.loginForm}>
              <h2 className="heading heading-2 heading-bold heading-secondary">سجل الدخول الآن</h2>
              <h4 className="heading heading-4 heading-semiBlod heading-lightGrey mt-1">!سجل الدخول .. هناك حجوزات بإنتظارك</h4>

              <LoginForm register={register} handleSubmit={handleSubmit} loginHandler={loginHandler} errors={errors} submit={submit} setSubmit={setSubmit} isSubmitting={isSubmitting} errorMessage={errorMessage} />
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.overlay}></div>
        </div>
      </div>
    </>
  );
};
