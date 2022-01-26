import { Button } from "../button/button";
import styles from "./forget-password.module.scss";
export const ForgetPasswordComponent = ({ register, handleSubmit, formHandler, errors }: any) => {
  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <h2 className="heading heading-2 heading-bold mb-1">! نسيت كلمة المرور </h2>
        <p className="heaidng-4 heading-semiBold heading-lightGrey mb-3">أدخل رقم الهاتف لإسترجاعها</p>
        <form action="" className={styles.form_box} dir="rtl" onSubmit={handleSubmit(formHandler)}>
          <div className="form-group mb-3">
            <label htmlFor="phoneNumber">
              <span className={styles.span_red}>*</span>رقم الهاتف
            </label>
            <input
              {...register("phoneNumber", {
                required: "يجب إدخال رقم الهاتف",
                pattern: {
                  value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,9}$/,
                  message: "رقم الهاتف غير صالح",
                },
              })}
              type="tel"
              name="phoneNumber"
              className={`form-control input  ${errors.phoneNumber ? "input_error" : "input_normal"}`}
              dir="rtl"
              placeholder="أدخل رقم الهاتف"
            />
            {errors.phoneNumber && <span className="error_span">{errors.phoneNumber.message}</span>}
          </div>
          <Button width="w-100" btnPrimary="btn-primary" type="submit">
            إرسال
          </Button>
        </form>
      </div>
    </div>
  );
};
