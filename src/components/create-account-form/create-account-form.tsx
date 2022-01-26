import Link from "next/link";
import axios from "../../utils/axios";
import { Button } from "../button/button";
import { ImageInput } from "../image-input/image-input";
import { PasswordInput } from "../password-input/password-input";
import { SpinnerComponent } from "../spinner/spinner-component";
import { AlertCompnent } from "../alert/alert";
import styles from "./create-account-form.module.scss";
import { Control, FieldError, UseFormGetValues, UseFormHandleSubmit, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { UserData } from "../../models";
import { Dispatch, SetStateAction } from "react";
interface Props {
  register: UseFormRegister<UserData>;
  handleSubmit: UseFormHandleSubmit<UserData>;
  control: Control<UserData, object>;
  formHandler: any;
  handleImageInput: (event: any) => void;
  image: string | undefined;
  setImage: Dispatch<SetStateAction<string | undefined>>;
  getValues: UseFormGetValues<UserData>;
  setValue: any;
  errorMessage: string;
  isSubmit: boolean;
  errors: any;
}

export const CreateAccountForm = ({ control, register, errors, handleSubmit, formHandler, handleImageInput, image, setImage, getValues, setValue, errorMessage, isSubmit }: Props) => {
  return (
    <>
      <form action="" onSubmit={handleSubmit(formHandler)} className={`form mt-3 text-end ${styles.form}`}>
        {errorMessage && <AlertCompnent errorMessage={errorMessage} />}
        <div className="form-group mb-2" dir="rtl">
          <label htmlFor="" className={styles.form_labelImage}>
            إختر صورة
          </label>
          <ImageInput
            name="profileImage"
            control={control}
            handleInput={handleImageInput}
            image={image}
            onClick={() => {
              setImage("");
              setValue("profileImage", null);
            }}
            deleteInput={false}
          />
        </div>
        <div className={`form-group ${styles.group} mb-2`}>
          <label htmlFor="name">
            <span className={styles.span_red}>*</span>الإسم
          </label>
          <input
            {...register("name", {
              required: "يجب إدخال الإسم",
              minLength: { value: 5, message: "الاسم يجد ان يكون علي الأقل 5 أحروف" },
              maxLength: {
                value: 30,
                message: "الاسم يجب أن لا يزيد عن 30 حرف",
              },
              validate: {
                trapSpacesForRequiredFields: (value: any) => {
                  return !!value.trim() || "يجب ان يحتوي الأسم  علي احروف";
                },
              },
            })}
            type="text"
            name="name"
            className={`form-control input  ${errors.name ? "input_error" : "input_normal"}`}
            dir="rtl"
            placeholder="أدخل الإسم"
          />
          {errors.name && <span className={styles.errorMessage}>{errors.name.message}</span>}
        </div>
        <div className={`form-group ${styles.group} mb-2`}>
          <label htmlFor="email">
            <span className={styles.span_red}>*</span>البريد الإلكتروني
          </label>
          <input
            {...register("email", {
              required: "يجب إدخال الايميل",
              minLength: { value: 5, message: "الاسم يجد ان يكون علي الأقل 5 أحروف" },
              maxLength: {
                value: 30,
                message: "الاسم يجب أن لا يزيد عن 30 حرف",
              },
              validate: {
                emailisExist: async (value: any) => {
                  try {
                    const response = await axios.post("/users/checkEmail", { email: value });

                    return !response.data || "هذا الايميل موجود بالفعل";
                  } catch (error) {
                    return false;
                  }
                },
              },
            })}
            type="email"
            name="email"
            className={`form-control input  ${errors.email ? "input_error" : "input_normal"}`}
            dir="rtl"
            placeholder="أدخل البريد الالكتروني"
          />
          {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
        </div>
        <div className={`form-group ${styles.group} mb-2`}>
          <label htmlFor="phone">
            <span className={styles.span_red}>*</span>رقم الهاتف
          </label>
          <input
            {...register("phone", {
              required: "يجب إدخال رقم الهاتف",
              pattern: {
                value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,9}$/,
                message: "رقم الهاتف غير صالح",
              },
            })}
            type="tel"
            name="phone"
            className={`form-control input  ${errors.phone ? "input_error" : "input_normal"}`}
            dir="rtl"
            placeholder="أدخل رقم الهاتف"
          />
          {errors.phone && <span className={styles.errorMessage}>{errors.phone.message}</span>}
        </div>
        <div className="mb-2">
          <PasswordInput
            title="كلمة المرور"
            register={register}
            error={errors.password}
            message={errors?.password?.message}
            forget={false}
            name="password"
            requiredMessage="يجب إدخال كلمة المرور"
            placeholder="أدخل كلمة المرور"
            validate={{
              trapSpacesForRequiredFields: (value: any) => {
                return !!value.trim() || "يجب ان تحتوي كلمة المرور علي احروف";
              },
            }}
          />
        </div>
        <div className="mb-2">
          <PasswordInput
            title="تأكيد كلمة المرور"
            register={register}
            error={errors?.confirmPassword}
            message={errors?.confirmPassword?.message}
            forget={false}
            name="confirmPassword"
            requiredMessage="يجب إدخال تأكيد كلمة المرور"
            placeholder="تأكيد كلمة المرور"
            validate={{
              checkPassword: (value: string) => {
                const { password } = getValues();
                return password === value || "كلمات السر لا تتطابق";
              },
            }}
          />
        </div>

        <div className="d-flex mt-3">
          <Button width="w-100" type="submit" btnPrimary="btn-primary" disabled={isSubmit}>
            {isSubmit ? <SpinnerComponent /> : <p className="mb-0"> إنشاء حساب</p>}
          </Button>
        </div>
        <p className={`${styles.haveAccount} mt-2`}>
          لديك حساب بالفعل !
          <Link href="/login">
            <a className={`${styles.new}`}> تسجيل الدخول</a>
          </Link>{" "}
        </p>
      </form>
    </>
  );
};
