import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Select from "react-select";
import { CheckBoxInput } from "../checkboxInput/checkbox-input";
import { Map } from "../map/map";
import styles from "./add-room-form.module.scss";
import { Button } from "../button/button";
import { Control, Controller, SubmitHandler, UseFormGetValues, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { FormValues, Service } from "../../models";
import { SpinnerComponent } from "../spinner/spinner-component";
import { AlertCompnent } from "../alert/alert";

interface Props {
  handleSubmit: UseFormHandleSubmit<FormValues>;
  control: Control<FormValues, object>;
  register: UseFormRegister<FormValues>;
  options: {
    value: string;
    label: string;
  }[];
  handleInput: (event: any) => void;
  imagesPreview: string[];
  getValues: UseFormGetValues<FormValues>;
  formHandler: any;
  removeElement: any;
  errors: any;
  setImagesPreview: Dispatch<SetStateAction<string[]>>;
  handleImages: (event: any) => void;
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
  location: any;
  setLocation: Dispatch<any>;
  services: any;
  isLoading: boolean;
  errorMessage: string;
  isSubmit: boolean;
}
export const AddRoomForm = ({ handleSubmit, formHandler, register, options, control, errors, handleInput, setImagesPreview, imagesPreview, getValues, removeElement, handleImages, images, setImages, location, setLocation, isLoading, services, errorMessage, isSubmit }: Props) => {
  return (
    <form action="" className={styles.create_room} onSubmit={handleSubmit(formHandler)}>
      {errorMessage && <AlertCompnent errorMessage={errorMessage} />}
      <div className={styles.input_cont}>
        <div className={styles.right}>
          <div className="form-group mb-2">
            <label htmlFor="" className={styles.label}>
              {" "}
              إسم الغرفة<span>*</span>
            </label>
            <input {...register("name", { required: "يجب ادخال اسم الغرفة", minLength: { value: 5, message: "اقل عدد من الحروف يجب ان يكون 5 حروف" }, maxLength: { value: 60, message: "عدد الحروف يجب ان لا يتخطي 60 حرف" } })} name="name" type="text" className={`form-control input ${errors.name ? "input_error" : "input_normal"}`} placeholder="إضف إسم الغرفة" />
            {errors.name && <span className={styles.error}>{errors.name.message}</span>}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="" className={styles.label}>
              التفاصيل
            </label>
            <textarea {...register("description")} name="description" className={`form-control input ${errors.description ? "input_error" : "input_normal"}  ${styles.textarea}`} placeholder="أدخل التفاصيل"></textarea>

            {errors.description && <span className={styles.error}>{errors.description.message}</span>}
          </div>
          <div className={`form-group mb-2 ${styles.group}`}>
            <label htmlFor="" className={styles.label}>
              سعر الليلة<span>*</span>
            </label>
            <input
              {...register("nightPrice", {
                required: "يجب إدخال سعر الغرفة",
                validate: (value: string) => {
                  return parseInt(value) > 0 || " يجب ان يكون سعر الغرفة اكبر من الصفر ";
                },
              })}
              name="nightPrice"
              type="text"
              className={`form-control input ${errors.nightPrice ? "input_error" : "input_normal"}`}
              placeholder="أدخل سعر الليلة"
            />
            <p>جنية</p>
            {errors.nightPrice && <span className={styles.error}>{errors.nightPrice.message}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="" className={styles.label}>
              عدد الأفراد<span>*</span>
            </label>
            <Controller
              name="capacity"
              control={control}
              rules={{ required: "يجب إدخال عدد الأفراد" }}
              render={({ field, fieldState }) => {
                return (
                  <>
                    <Select instanceId="karem" isClearable {...field} menuPlacement="top" options={options} classNamePrefix={fieldState.error ? "error-select" : "number-select"} placeholder="أدخل عدد الأفراد" />
                    {fieldState.error && <span className={styles.error}>{fieldState.error.message}</span>}
                  </>
                );
              }}
            />
          </div>
        </div>

        <div className={styles.left}>
          <div className={`form-group ${styles.group} `}>
            <label htmlFor="" className={styles.label_left}>
              {" "}
              الخدمات المقدمة<span>*</span>
            </label>
            {services && !isLoading ? (
              <>
                <div className={styles.services}>
                  {services?.map((service: Service) => {
                    return <CheckBoxInput required={true} key={service?._id} register={register} name="services" value={service._id} title={service.name} icon={`${service.name}`} />;
                  })}
                </div>
                {errors.services && <span className={styles.servicesError}>{errors.services.message}</span>}
              </>
            ) : (
              <div> جاري تحميل الخدمات ...</div>
            )}
          </div>
          <div className={`form-group mb-2 ${styles.image_cont}`}>
            <div className={styles.addImage}>
              <label htmlFor="" className={styles.label_left}>
                {" "}
                أضف صور للغرفة<span>*</span>
              </label>
            </div>
            <div className={styles.images}>
              {imagesPreview.map((image: any, index: number) => {
                return (
                  <div key={index} className={styles.image_button}>
                    <img src={imagesPreview[index]} alt="" className={styles.image} />
                    <button
                      className={styles.delete}
                      type="button"
                      onClick={() => {
                        let filteredItems = removeElement(imagesPreview, index + 1);
                        setImagesPreview(filteredItems);
                        let filteredImages = removeElement(images, index + 1);
                        console.log("filterdFiles", filteredImages);
                        setImages(filteredImages);
                      }}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                );
              })}
              {images.length < 5 && (
                <div className={styles.image_box}>
                  <button
                    type="button"
                    onClick={() => {
                      document.getElementById("images")?.click();
                    }}
                  >
                    <i className="fas fa-plus"></i>
                  </button>

                  <input
                    {...register("images", {
                      validate: {
                        isRequired: () => {
                          const { images } = getValues();
                          return images.length !== 0 || "يجب إدخال صورة";
                        },
                      },
                      max: {
                        value: 5,
                        message: "اكبر عدد من الصور 5",
                      },
                      onChange: (event: any) => {
                        handleImages(event);
                        handleInput(event);
                      },
                    })}
                    type="file"
                    name="images"
                    id="images"
                    multiple
                  />

                  {errors.images && <span className={styles.error}>{errors.images.message}</span>}
                </div>
              )}
            </div>
            {images.length > 5 && <span className={styles.maxImageNumber}>اكبر عدد من الصور 5</span>}
          </div>
          <div className="form-group">
            <label htmlFor="" className={styles.label_left}>
              {" "}
              العنوان علي الخريطة<span>*</span>
            </label>
            <div className={styles.map}>
              <Map setLocation={setLocation} location={location} borderRadius="border-r" />
            </div>

            {!location && <span className={styles.maxImageNumber}>يجب إدخال العنوان</span>}
          </div>
        </div>
      </div>
      <div className={styles.submit_button}>
        <Button type="submit" width="w-100" btnPrimary="btn-primary" disabled={images.length > 5 || !location || isSubmit ? true : false}>
          {isSubmit ? <SpinnerComponent /> : <p className="mb-0"> إضافة</p>}
        </Button>
      </div>
    </form>
  );
};
