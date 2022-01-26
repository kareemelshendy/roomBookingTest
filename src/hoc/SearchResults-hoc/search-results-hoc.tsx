import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SearchResultsComponent } from "../../components/search-results/search-results";
import { useRooms } from "../../hooks/use-rooms.hook";
import { useServices } from "../../hooks/use-services.hook";
import { Location, Room, RoomPage, Service } from "../../models";

interface Props {
  fallbackPage: RoomPage;
  fallbackServices: Service[];
  defaultLocation: {
    lat: number;
    lng: number;
  };
  maxNightPrice: string;
  minNightPrice: string;
  service: string[];
}

export const SearchResultsHOC = ({ fallbackPage, fallbackServices, defaultLocation, maxNightPrice, minNightPrice, service }: Props) => {
  const [showSort, setShowSort] = useState<boolean>(false);
  const [showClass, setShowClass] = useState<boolean>(false);
  const [toDate, setToDate] = useState<Date>(new Date());
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [numberOfUsers, setNumberOfUsers] = useState<number>(1);
  const [location, setLocation] = useState(defaultLocation && defaultLocation);
  const { register, handleSubmit, control, setValue } = useForm();
  const router = useRouter();
  const pageNumber = router.query.pageNumber as string;

  const { roomsPage, isLoading, isError } = useRooms(pageNumber, fallbackPage, "", defaultLocation.lat, defaultLocation.lng, +minNightPrice, +maxNightPrice, service);
  const options = [
    { value: "ascending", label: "من الأقل إلي الأعلي" },
    { value: "descending", label: "من الأعلي إلي ألاقل" },
  ];

  useEffect(() => {
    if (location) {
      setValue("location", location);
    }
  }, [location]);

  const incrementCount = () => {
    setNumberOfUsers(numberOfUsers + 1);
    setValue("numberOfUsers", numberOfUsers + 1);
  };

  const decrementCount = () => {
    if (numberOfUsers > 0) {
      setNumberOfUsers(numberOfUsers - 1);
      setValue("numberOfUsers", numberOfUsers - 1);
    }
  };

  function handleButton(data: any) {
    console.log(data);
    router.push({
      pathname: "/search-results",
      query: {
        pageNumber: 1,
        latitude: data.location.lat ? data.location.lat : undefined,
        longitude: data.location.lng ? data.location.lng : undefined,
        // toDate: +dayjs(data.toDate).endOf("day"),
        // fromDate: +dayjs(data.fromDate).startOf("day"),
        minNightPrice: data.minPrice ? data.minPrice : undefined,
        maxNightPrice: data.maxPrice ? data.maxPrice : undefined,
        service: data.services ? data.services : undefined,
      },
    });

    setShowClass(false);
  }
  return <SearchResultsComponent options={options} showSort={showSort} setShowSort={setShowSort} handleButton={handleButton} handleSubmit={handleSubmit} control={control} showClass={showClass} setShowClass={setShowClass} register={register} toDate={toDate} setToDate={setToDate} fromDate={fromDate} setFromDate={setFromDate} numberOfUsers={numberOfUsers} incrementCount={incrementCount} decrementCount={decrementCount} setValue={setValue} rooms={roomsPage?.data} fallbackServices={fallbackServices} location={location} setLocation={setLocation} roomIsLoading={isLoading} pageCount={roomsPage?.pageCount} />;
};
