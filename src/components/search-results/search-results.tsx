import { Dispatch, SetStateAction } from "react";
import { Control, FieldValues, UseFormHandleSubmit, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { FilterHOC } from "../../hoc/filter-hoc/filter-hoc";
import { useServices } from "../../hooks/use-services.hook";
import { Room, Service } from "../../models";
import { Button } from "../button/button";
import { Card } from "../card/card";
import { ClassModal } from "../class-modal/class-modal";
import { NoData } from "../no-data/no-data";
import { Pagination } from "../pagination/pagination";
import { SortModal } from "../sort-modal/sort-modal";
import styles from "./search-results.module.scss";

interface Props {
  options: {
    value: string;
    label: string;
  }[];
  showSort: boolean;
  setShowSort: Dispatch<SetStateAction<boolean>>;
  handleButton(data: any): void;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  control: Control<FieldValues, object>;
  showClass: boolean;
  setShowClass: Dispatch<SetStateAction<boolean>>;
  register: UseFormRegister<FieldValues>;
  toDate: Date;
  setToDate: Dispatch<SetStateAction<Date>>;
  fromDate: Date;
  setFromDate: Dispatch<SetStateAction<Date>>;
  numberOfUsers: number;
  incrementCount: () => void;
  decrementCount: () => void;
  setValue: UseFormSetValue<FieldValues>;
  rooms: Room[] | undefined;
  fallbackServices: Service[];
  location: {
    lat: number;
    lng: number;
  };
  setLocation: Dispatch<
    SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
  roomIsLoading: boolean;
  pageCount: number | undefined;
}

export const SearchResultsComponent = ({ options, showSort, setShowSort, handleButton, handleSubmit, control, showClass, setShowClass, register, toDate, setToDate, fromDate, setFromDate, numberOfUsers, incrementCount, decrementCount, setValue, rooms, location, setLocation, fallbackServices, roomIsLoading, pageCount }: Props) => {
  const { services, isLoading, isError } = useServices(fallbackServices);

  return (
    <section id={styles.search_cont}>
      <FilterHOC />
      <div className="container mt-3  mb-3">
        <div className="row mb-3" dir="rtl">
          <div className={styles.searchTop} dir="ltr">
            <h2 className={`heading heading-3 heading-bold ${styles.searchTitle}`} dir="rtl">
              نتائج البحث
            </h2>
            <div className={styles.buttons}>
              <div className={styles.button}>
                <Button width="w-100" btnBorderDarkGrey="btn-border-darkGrey" onClick={() => setShowSort(true)}>
                  ترتيب
                  <i className={`fas fa-sort fa-1x  ${styles.icon}`}></i>{" "}
                </Button>
              </div>

              <div className={styles.button}>
                <Button
                  width="w-100"
                  btnBorderDarkGrey="btn-border-darkGrey"
                  onClick={() => {
                    setShowClass(true);
                  }}
                >
                  تصنيف
                  <i className={`fas fa-sliders-v  ${styles.icon}`}></i>
                </Button>
              </div>
            </div>
          </div>
          {rooms?.length === 0 && <NoData title="لا يوجد غرف" />}
          {roomIsLoading ? (
            <div>...جاري التحميل</div>
          ) : (
            rooms?.map((room: Room) => {
              return (
                <div key={room._id} className="col-md-6 col-lg-3 mt-3 mb-3 ">
                  <Card id={null} room={room} />
                </div>
              );
            })
          )}
          {rooms && rooms?.length > 0 && <Pagination pageCount={pageCount} />}
        </div>
      </div>
      <SortModal options={options} showSort={showSort} setShowSort={setShowSort} handleButton={handleButton} handleSubmit={handleSubmit} control={control} />
      <ClassModal showClass={showClass} setShowClass={setShowClass} handleButton={handleButton} handleSubmit={handleSubmit} control={control} register={register} toDate={toDate} setToDate={setToDate} fromDate={fromDate} setFromDate={setFromDate} numberOfUsers={numberOfUsers} setValue={setValue} incrementCount={incrementCount} decrementCount={decrementCount} services={services} location={location} setLocation={setLocation} />
    </section>
  );
};
