import { Dispatch, SetStateAction, useState } from "react";
import { Form } from "react-bootstrap";
import styles from "./filter.module.scss";
import DatePicker from "react-datepicker";
import { Map } from "../map/map";
import { Control, Controller, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import Select from "react-select";
import { MapModal } from "../map-modal/map-modal";

export interface FormVlaues {
  numberOfUsers: {
    label: string;
    value: string;
  } | null;
  fromDate: Date;
  toDate: Date;
  location: {
    lat: number;
    lng: number;
  };
}
interface Props {
  register: UseFormRegister<FormVlaues>;
  handleSubmit: UseFormHandleSubmit<FormVlaues>;
  filterHandler: (FormVlaues: any) => void;
  control: Control<FormVlaues, object>;
  setShow: Dispatch<SetStateAction<boolean>>;
  show: boolean;
  location: any;
  setLocation: Dispatch<any>;
}
export const Filter = ({ handleSubmit, filterHandler, control, location, setLocation }: Props) => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showMap, setShowMap] = useState(false);

  const options = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
  ];

  function handleShowMap() {
    setShowMap(false);
  }
  return (
    <>
      <div className={styles.form_container}>
        <form className={`form shadow_sm ${styles.form}`} onSubmit={handleSubmit(filterHandler)}>
          <div className={styles.button}>
            <button type="submit" className="btn btn-primary w-100 d-flex justify-content-center lign-items-center">
              <i className="fas fa-search"></i>
            </button>
          </div>
          <div className={`${styles.group}`}>
            <div className={styles.label}>
              <label htmlFor="numberOfUsers">الأفراد</label>
              <i className="fas fa-user"></i>
            </div>

            <Controller
              name="numberOfUsers"
              control={control}
              
              render={({ field }) => {
                return (
                  <Select
                    isRtl={true}
                    instanceId="karem"
                    classNamePrefix="react-select"
                    closeMenuOnScroll={true}
                    escapeClearsValue={true}
                    maxMenuHeight={264}
                    onMenuScrollToBottom={() => {
                      console.log("scrolling to bottom");
                    }}
                    isClearable
                    {...field}
                    options={options}
                    placeholder="عدد الأفراد"
                  />
                );
              }}
            />
          </div>
          <div className={` ${styles.group}`}>
            <div className={styles.label}>
              <label htmlFor="fromDate">التاريخ</label>
              <i className="far fa-calendar"></i>
            </div>
            <div className={styles.date}>
              <Controller
                name="toDate"
                control={control}
                defaultValue={toDate}
                render={({ field }) => {
                  return (
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
                      className={`${styles.datePicker} shadow_sm`}
                    />
                  );
                }}
              />
              <p> : الي تاريخ</p>
            </div>
          </div>

          <div className={` ${styles.group} ${styles.datePicker_container}`}>
            <div className={styles.label}>
              <label htmlFor="fromDate">التاريخ</label>

              <i className="far fa-calendar"></i>
            </div>

            <div className={styles.date}>
              <Controller
                name="fromDate"
                control={control}
                defaultValue={fromDate}
                render={({ field }) => {
                  return (
                    <DatePicker
                      selected={field.value}
                      onChange={(e: Date) => {
                        field.onChange(e);
                        setFromDate(e);
                      }}
                      selectsStart
                      startDate={fromDate}
                      endDate={toDate}
                      minDate={fromDate}
                      dateFormat="yyyy-MM-dd"
                      className={`${styles.datePicker} shadow_sm`}
                    />
                  );
                }}
              />
              <p>: من تاريخ</p>
            </div>
          </div>
          <div
            className={styles.group}
            onClick={() => {
              setShowMap(true);
            }}
          >
            <div className={styles.label}>
              <label htmlFor="numberOfUsers">الموقع</label>
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <p className={styles.location} onSubmit={handleSubmit(filterHandler)}>
              إبحث عن المكان
            </p>
          </div>
        </form>
      </div>

      <MapModal showMap={showMap} handleShowMap={handleShowMap} setLocation={setLocation} location={location} setShowMap={setShowMap} hamdleMarker={() => {}} />
    </>
  );
};
