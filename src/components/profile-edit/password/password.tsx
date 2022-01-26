import { useRouter } from "next/router";
import { FieldValues, UseFormGetValues, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { Button } from "../../button/button";
import { PasswordInput } from "../../password-input/password-input";
import { SpinnerComponent } from "../../spinner/spinner-component";
import styles from "./password.module.scss";

interface Props {
  register: UseFormRegister<FieldValues>;
  errors: {
    [x: string]: any;
  };
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  formHandler: (data: any) => void;
  isSubmit: boolean;
}

export const EditPasswordComponent = ({ handleSubmit, formHandler, register, errors, getValues, isSubmit }: Props) => {
  const router = useRouter();

  function checkPassowrdConfirmHandler(value: any) {
    const { newPassword } = getValues();
    console.log(newPassword);
    return newPassword === value || "كلمة المرور غير متطابقه";
  }

  return (
    <form action="" onSubmit={handleSubmit(formHandler)} className={`${styles.form} shadow_sm`} dir="rtl">
      <div className="form-group mb-3">
        <PasswordInput register={register} name="password" title="كلمة المرور القديمة" forget={true} error={errors.password} message={errors?.password?.message} requiredMessage="يجب أدخال كلمة المرور القديمة" />
      </div>
      <div className="form-group mb-3">
        <PasswordInput register={register} name="newPassword" errors={errors} title="كلمة المرور الجديدة" error={errors.newPassword} message={errors?.newPassword?.message} requiredMessage="يجب أدخال كلمة المرور الجديدة" getValues={getValues} />
      </div>
      <div className="form-group mb-3">
        <PasswordInput
          register={register}
          name="confirmNewPassword"
          errors={errors}
          title="تأكيد كلمة المرور الجديدة"
          error={errors.confirmNewPassword}
          message={errors?.confirmNewPassword?.message}
          requiredMessage="يجب ادخال تأكيد كلمة المرور"
          checkPassowrdConfirmHandler={checkPassowrdConfirmHandler}
          getValues={getValues}
          validate={{
            checkPassword: (value: string) => {
              const { newPassword } = getValues();
              return newPassword === value || "كلمات السر لا تتطابق";
            },
          }}
        />
      </div>
      <div className={`form-group ${styles.buttons}`}>
        <div className={styles.button}>
          <Button type="submit" btnPrimary="btn-primary" width="w-100" disabled={isSubmit}>
            {isSubmit ? <SpinnerComponent /> : <p className="mb-0">حفظ</p>}
          </Button>
        </div>
        <div className={styles.button}>
          <Button
            type="button"
            btnBorderPrimary="btn-border-primary"
            width="w-100"
            onClick={() => {
              router.push("/profile");
            }}
            disabled={isSubmit}
          >
            تارجع
          </Button>
        </div>
      </div>
    </form>
  );
};
