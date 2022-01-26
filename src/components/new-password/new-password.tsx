import { Button } from "../button/button";
import { PasswordInput } from "../password-input/password-input";
import styles from "./new-password.module.scss";
export const NewPasswordComponent = ({ register, handleSubmit, formHandler, errors, getValues }: any) => {
  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <h2 className="heading heading-2 heading-bold mb-1">كلمة المرور الجديدة</h2>
        <p className="heaidng-4 heading-semiBold heading-lightGrey mb-3">أدخل كلمة المرور الجديدة</p>

        <form action="" className={styles.form_box} dir="rtl" onSubmit={handleSubmit(formHandler)}>
          <div className="mb-2">
            <PasswordInput title="كلمة المرور الجديدة" register={register} error={errors.newPassword} message={errors?.newPassword?.message} forget={false} name="newPassword" requiredMessage="يجب إدخال كلمة المرور الجديدة" placeholder="أدخل كلمة المرور الجديدة" />
          </div>
          <div className="mb-3">
            <PasswordInput
              title="تأكيد كلمة المرور الجديدة"
              register={register}
              error={errors.confirmNewPassword}
              message={errors?.confirmNewPassword?.message}
              forget={false}
              name="confirmNewPassword"
              requiredMessage="يجب إدخال تأكيد كلمة المرور الجديدة"
              placeholder="تأكيد كلمة المرور الجديدة"
              validate={{
                checkPassword: (value: string) => {
                  const { newPassword } = getValues();
                  return newPassword === value || "كلمات السر لا تتطابق";
                },
              }}
            />
          </div>

          <Button width="w-100" btnPrimary="btn-primary" type="submit">
            تأكيد
          </Button>
        </form>
      </div>
    </div>
  );
};
