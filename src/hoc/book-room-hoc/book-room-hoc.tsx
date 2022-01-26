import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BookRoomForm } from "../../components/book-room-form/book-room-form";
import axios from "../../utils/axios";

interface formBody {
  room: string;
  notes: string;
  startDate: number;
  endDate: number;
}

export const BookRoomHOC = ({ roomId }: { roomId: string }) => {
  const [toDate, setToDate] = useState<Date>(new Date());
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const bookRoom = async (data: formBody) => {
    try {
      const response = await axios.post(`/bookings`, data);
      console.log(response.data);
      router.push("/reservations?pageNumber=1");

      reset();
    } catch (error: any) {
      // console.log(error?.response?.data.message);
      setIsSubmit(false);
      setErrorMessage(error?.response.data.message);
    }
  };

  function formHandler(data: any) {
    // console.log(typeof roomId);
    const formBody = {
      room: roomId as string,
      notes: data.comments,
      startDate: +dayjs(data.fromDate).startOf("day"),
      endDate: +dayjs(data.toDate).endOf("day"),
    };
    setIsSubmit(true);

    bookRoom(formBody);
    console.log(formBody);
    // setTimeout(() => {
    //   router.push("/reservations");
    // }, 2000);
  }
  return (
    <div className="container mt-3 border-r shadow_sm">
      <BookRoomForm control={control} toDate={toDate} setToDate={setToDate} fromDate={fromDate} setFromDate={setFromDate} handleSubmit={handleSubmit} register={register} formHandler={formHandler} errors={errors} isSubmit={isSubmit} errorMessage={errorMessage} />
    </div>
  );
};
