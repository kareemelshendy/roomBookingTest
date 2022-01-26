import { useState } from "react";
import Link from "next/link";

import styles from "./passwor-input.module.scss";

export const PasswordInput = ({ register, error, message, name, forget, title, requiredMessage, validate, placeholder }: any) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className={`form-group  ${styles.group}`}>
        <label htmlFor="phoneNumber" dir="ltr">
          <span className={styles.span_red}>*</span>
          {title}
        </label>

        <div className={styles.passwordIcon}>
          <i
            className={`${show ? "fas fa-eye-slash" : "fas fa-eye"}`}
            onClick={() => {
              setShow(!show);
            }}
          ></i>
        </div>
        <input
          {...register(name, {
            required: requiredMessage,
            minLength: { value: 6, message: "كلمة المرور يجب أن تكون أكثر من 5 أحرف" },
            validate: validate,
          })}
          type={show ? "text" : "password"}
          className={`form-control  input ${error ? "input_error" : "input_normal"}`}
          name={name}
          dir="rtl"
          placeholder={placeholder}
        />

        {error && <span className={styles.errorMessage}>{message}</span>}
        {forget && (
          <Link href="/forget-password">
            <a className={`${styles.forget}`}>! نسيت كلمة المرور</a>
          </Link>
        )}
      </div>
    </>
  );
};
