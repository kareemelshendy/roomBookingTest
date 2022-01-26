import { Button } from "../button/button";
import { SpinnerComponent } from "../spinner/spinner-component";
import { AlertCompnent } from "../alert/alert";
import styles from "./otp.module.scss";
export const OTPComponent = ({ register, handleSubmit, formHandler, errors, errorMessage, isSubmit }: any) => {
  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <h2 className="heading heading-2 heading-bold mb-1">كود التحقق</h2>
        <p className="heaidng-4 heading-semiBold heading-lightGrey mb-3">أدخل كود التحقق</p>
        <form action="" className={styles.form_box} dir="ltr" onSubmit={handleSubmit(formHandler)}>
          {errorMessage && <AlertCompnent errorMessage={errorMessage} />}
          <div className={`"form-group " ${styles.input_group}`}>
            <div className={styles.input}>
              <input {...register("otp1", { required: true })} maxLength={1} minLength={1} className={`form-control input  ${errors.otp1 ? "input_error" : "input_normal"}`} type="text" name="otp1" id="" />
            </div>
            <div className={styles.input}>
              <input {...register("otp2", { required: true })} maxLength={1} minLength={1} className={`form-control input  ${errors.otp2 ? "input_error" : "input_normal"}`} type="text" name="otp2" id="" />
            </div>
            <div className={styles.input}>
              <input {...register("otp3", { required: true })} maxLength={1} minLength={1} className={`form-control input  ${errors.otp3 ? "input_error" : "input_normal"}`} type="text" name="otp3" id="" />
            </div>
            <div className={styles.input}>
              <input {...register("otp4", { required: true })} maxLength={1} minLength={1} className={`form-control input  ${errors.otp4 ? "input_error" : "input_normal"}`} type="text" name="otp4" id="" />
            </div>

            {/* {errors.phoneNumber && <span className="error_span">{errors.phoneNumber.message}</span>} */}
          </div>
          <Button width="w-100" btnPrimary="btn-primary" type="submit" disabled={isSubmit}>
            {isSubmit ? <SpinnerComponent /> : <p className="mb-0"> تأكيد</p>}
          </Button>
        </form>
      </div>
    </div>
  );
};
