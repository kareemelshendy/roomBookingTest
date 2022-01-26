import { useRouter } from "next/router";
import { Button } from "../../button/button";
import { ImageInput } from "../../image-input/image-input";
import { SpinnerComponent } from "../../spinner/spinner-component";
import { AlertCompnent } from "../../alert/alert";
import styles from "./information.module.scss";
import { Control, UseFormHandleSubmit, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import { Owner } from "../../../models";

interface FormValues {
  name: string | undefined;
  phone: string | undefined;
  profileImage: string;
}
interface Props {
  register: UseFormRegister<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  formHandler: (data: any) => void;
  errors: any;
  control: Control<FormValues, object>;
  handleImageInput: (event: any) => void;
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
  setValue: UseFormSetValue<any>;
  user: Owner | undefined;
  errorMessage: string;
  isSubmit: boolean;
}

export const EditInformationComponent = ({ register, handleSubmit, formHandler, errors, control, handleImageInput, image, setImage, setValue, user, isSubmit, errorMessage }: Props) => {
  const router = useRouter();
  return (
    <form action="" onSubmit={handleSubmit(formHandler)} className={`${styles.form} shadow_sm`} dir="rtl">
      {errorMessage && <AlertCompnent errorMessage={errorMessage} />}{" "}
      <div className="form-group mb-3">
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
      <div className="form-group mb-3">
        <label htmlFor="" className={styles.form_label}>
          الإسم <span>*</span>
        </label>
        <input
          {...register("name", {
            required: "يجب ادخال الإسم",
            minLength: { value: 5, message: "الاسم يجد ان يكون علي الأقل 5 أحروف" },
            maxLength: {
              value: 30,
              message: "الاسم يجب أن لا يزيد عن 30 حرف",
            },
          })}
          type="text"
          name="name"
          className={`form-control  input  ${errors.name ? "input_error" : "input_normal"}`}
          placeholder="أدخل الاسم"
        />
        {errors.name && <span className="error_span">{errors.name.message}</span>}
      </div>
      <div className="form-group mb-3">
        <label className={styles.form_label}>
          {" "}
          رقم الهاتف <span>*</span>
        </label>
        <input
          {...register("phone", {
            // required: "يجب إدخال رقم الهاتف",
          })}
          type="tel"
          name="phone"
          id=""
          className={`form-control  input  ${errors.phone ? "input_error" : "input_normal"}`}
          placeholder="أدخل رقم الهاتف"
          readOnly
        />
        {errors.phone && <span className="error_span">{errors.phone.message}</span>}
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
              router.push(`/profile/${user?._id}`);
            }}
          >
            تارجع
          </Button>
        </div>
      </div>
    </form>
  );
};
