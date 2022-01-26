import Image from "next/image";
import { useEffect, useState } from "react";
import { Control, Controller } from "react-hook-form";

import styles from "./image-input.module.scss";
interface FormValues {
  name: string | undefined;
  phone: string | undefined;
  profileImage: string;
}
interface Props {
  image: string | undefined;
  setDisabled?: any;
  handleInput: (event: any) => void;
  name: string;
  onClick: any;
  control: Control<any, object>;
  deleteInput: boolean;
}

export const ImageInput = ({ image, setDisabled, handleInput, name, onClick, control, deleteInput }: Props) => {
  return (
    <div className={styles.image_button}>
      {image ? (
        <>
          <img
            src={image}
            alt="profileImage"
            className={styles.image}
            onClick={() => {
              document.getElementById(name)?.click();
            }}
          />
          <button className={styles.delete} type="button" onClick={onClick}>
            <i className="fas fa-times"></i>
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={() => {
              document.getElementById(name)?.click();
            }}
          >
            <i className="fas fa-plus"></i>
          </button>
          {deleteInput && (
            <button className={styles.delete} role="button" onClick={onClick}>
              <i className="fas fa-times"></i>
            </button>
          )}
        </>
      )}

      <Controller
        name={name}
        control={control}
        rules={{ required: "يجب إدخال الصورة" }}
        render={({ field, fieldState }) => {
          return (
            <>
              <input
                type="file"
                name={name}
                id={name}
                onChange={(event: any) => {
                  const file = event.target.files[0];
                  handleInput(event);
                  field.onChange(file);
                  if (setDisabled) {
                    setDisabled(false);
                  }
                }}
              />
              {fieldState.error && <span className={styles.error}>{fieldState.error.message}</span>}
            </>
          );
        }}
      />
    </div>
  );
};
