import { Children } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { FormValues } from "../../models";
import { BadgeComponent } from "../badge/badge";
import styles from "./checkbox-input.module.scss";

interface Props {
  title: string;
  register: any;
  name: string;
  value: string;
  icon: string;
  required: boolean;
}
export const CheckBoxInput = ({ title, register, value, icon, required }: Props) => {
  return (
    <>
      <div className={styles.service_group}>
        <input
          {...register("services", {
            required: {
              value: required,
              message: "يجب إدخال خدمة واحدة علي الأقل",
            },
          })}
          type="checkbox"
          id={value}
          className="input"
          name="services"
          value={value}
        />
        <label htmlFor={value} className={`label ${styles.service_label}`}>
          <BadgeComponent bg="badge-input" title={title} icon={icon} />
        </label>
      </div>
    </>
  );
};
