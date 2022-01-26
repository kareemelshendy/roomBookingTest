import { Filter } from "../../components/filter/filter";
import { useEffect, useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import dayjs from "dayjs";
import styels from "./filter-hoc.module.scss";
import { useRouter } from "next/router";

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

export const FilterHOC = () => {
  const [show, setShow] = useState(false);
  const [location, setLocation] = useState<any>({});
  const router = useRouter();
  const { register, handleSubmit, control, getValues, reset, setValue } = useForm<FormVlaues>();

  useEffect(() => {
    if (location) {
      setValue("location", location);
    }
  }, [location]);

  function filterHandler(data: FormVlaues) {
    // console.log(data.toDate, data.fromDate)
    console.log({
      numberOfUsers: data.numberOfUsers,
      fromDate: +dayjs(data.fromDate).startOf("day"),
      toDate: +dayjs(data.toDate).endOf("day"),
      location: data.location,
    });
    reset({
      numberOfUsers: null,
      fromDate: new Date(),
      toDate: new Date(),
      location: {},
    });
    setLocation({});

    router.push({
      pathname: "/search-results",
      query: {
        latitude: data.location.lat ? data.location.lat : "",
        longitude: data.location.lng ? data.location.lat : "",
        toDate: +dayjs(data.toDate).endOf("day"),
        fromDate: +dayjs(data.fromDate).startOf("day"),
        numberOfUsers: data.numberOfUsers?.value,
      },
    });
  }

  return (
    <div className="container">
      <div className="row">
        <div className={styels.cont}>
          <Filter register={register} handleSubmit={handleSubmit} filterHandler={filterHandler} control={control} setShow={setShow} show={show} location={location} setLocation={setLocation} />
        </div>
      </div>
    </div>
  );
};
