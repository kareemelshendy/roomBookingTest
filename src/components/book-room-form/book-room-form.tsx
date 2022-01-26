import { Control, Controller, FieldValues, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import DatePicker from "react-datepicker";

import styles from "./book-room-form.module.scss";
import { Button } from "../button/button";
import { useRouter } from "next/router";
import { SpinnerComponent } from "../spinner/spinner-component";
import { Dispatch, SetStateAction } from "react";
import { AlertCompnent } from "../alert/alert";

interface Props {
  control: Control;
  toDate: Date;
  fromDate: Date;
  setToDate: Dispatch<SetStateAction<Date>>;
  setFromDate: Dispatch<SetStateAction<Date>>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  register: UseFormRegister<FieldValues>;
  formHandler: (data: any) => void;
  errors: { [x: string]: any };
  isSubmit: boolean;
  errorMessage: string;
}

export const BookRoomForm = ({ control, toDate, setToDate, fromDate, setFromDate, handleSubmit, register, formHandler, errors, isSubmit, errorMessage }: Props) => {
  const router = useRouter();
  return (
    <div className="conteiner mb-3">
      <div className="row" dir="rtl">
        <div className="col-md-12">
          <div className={styles.form_container}>
            <h2 className="heading heading-3 heading-bold heading-secondary mb-1">حجز غرفة</h2>
            <p className="heading-4 heading-semiBold heading-lightGrey mb-3">أضف بيانات الحجز</p>
            <form action="" onSubmit={handleSubmit(formHandler)} className={styles.form}>
              {errorMessage && <AlertCompnent errorMessage={errorMessage} />}
              <div className={styles.date}>
                <div className={styles.date_group}>
                  <label htmlFor="" className={styles.label}>
                    التاريخ<span>*</span>
                  </label>
                  <div className={styles.datePicker_container}>
                    <i className="far fa-calendar"></i>
                    <Controller
                      name="fromDate"
                      control={control}
                      rules={{ required: "يجب إدخال تاريخ البداية" }}
                      render={({ field, fieldState }) => {
                        return (
                          <>
                            <DatePicker
                              selected={field.value}
                              onChange={(date: Date) => {
                                field.onChange(date);
                                setFromDate(date);
                              }}
                              selectsEnd
                              startDate={fromDate}
                              endDate={toDate}
                              minDate={fromDate}
                              dateFormat="yyyy-MM-dd"
                              placeholderText="من تاريخ"
                              className={`${styles.datePicker} ${fieldState.error ? styles.error : styles.normal}`}
                            />
                            {fieldState.error && <span className={styles.date_error}>{fieldState.error?.message}</span>}
                          </>
                        );
                      }}
                    />
                  </div>
                </div>

                <div className={styles.date_group}>
                  <label htmlFor="" className={styles.label}>
                    التاريخ<span>*</span>
                  </label>
                  <div className={styles.datePicker_container}>
                    <i className="far fa-calendar"></i>
                    <Controller
                      name="toDate"
                      control={control}
                      rules={{ required: "يجب إدخال تاريخ الانتهاء" }}
                      render={({ field, fieldState }) => {
                        return (
                          <>
                            <DatePicker
                              selected={field.value}
                              onChange={(date: Date) => {
                                field.onChange(date);
                                setToDate(date);
                              }}
                              selectsEnd
                              startDate={fromDate}
                              endDate={toDate}
                              minDate={fromDate}
                              dateFormat="yyyy-MM-dd"
                              placeholderText="إلي تاريخ"
                              className={`${styles.datePicker} ${fieldState.error ? styles.error : styles.normal}`}
                            />
                            {fieldState.error && <span className={styles.date_error}>{fieldState.error?.message}</span>}
                          </>
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="" className={styles.label}>
                  ملاحظات <span>*</span>
                </label>
                <textarea
                  {...register("comments", {
                    required: "يجب إدخال الملاحظات",
                    validate: {
                      trapSpacesForRequiredFields: (value: any) => {
                        return !!value.trim() || "يجب ان تحتوي علي احروف";
                      },
                    },
                  })}
                  className={`form-control input ${styles.comments}  ${errors.comments ? "input_error" : "input_normal"}`}
                  name="comments"
                  placeholder="أدخل الملاحظات"
                ></textarea>
                {errors.comments && <span className={styles.error}>{errors.comments.message}</span>}
              </div>
              <div className={styles.button}>
                <Button btnPrimary="btn-primary" type="submit" width="w-100" disabled={isSubmit}>
                  {isSubmit ? <SpinnerComponent /> : <p className="mb-0">حجز</p>}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
