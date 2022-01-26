import { useForm } from "react-hook-form";
import styles from "./add-room-hoc.module.scss";
import { useEffect, useState } from "react";
import { AddRoomForm } from "../../components/add-room-form/add-room-form";
import { useRouter } from "next/router";
import { useServices } from "../../hooks/use-services.hook";
import axios from "../../utils/axios";
import { Room, Service } from "../../models";
import { useSWRConfig } from "swr";

interface Props {
  defaultValues: any | null;
  status: string;
  room: Room | null;
  imagesArray: string[] | null;
  fallbackServices: Service[];
}
interface FormValues {
  capacity: {
    value: string;
    label: string;
  };
  nightPrice: string;
  description: string;
  name: string;
  services: string[];
  images: Blob[];
  location: {
    lng: number;
    lat: number;
  };
}
export const AddRoomHOC = ({ defaultValues, status, room, imagesArray, fallbackServices }: Props) => {
  const [imagesPreview, setImagesPreview] = useState<string[]>(imagesArray ? imagesArray : []);
  const [images, setImages] = useState<File[]>(defaultValues?.images ? defaultValues?.images : []);
  const [location, setLocation] = useState(defaultValues?.location);
  const [errorMessage, setErrorMEssage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter();
  const { services, isLoading, isError } = useServices(fallbackServices);
  const { mutate, cache } = useSWRConfig();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
    setValue,
    getValues,
  } = useForm<FormValues>({
    defaultValues,
    mode: "onBlur",
  });

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

  useEffect(() => {
    if (images) {
      setValue("images", images);
    }
  }, [images]);

  useEffect(() => {
    if (location) {
      setValue("location", location);
    }
  }, [location]);

  const handleInput = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const fileArray = Array.from(event.target.files).map((file: any) => {
        return URL.createObjectURL(file);
      });
      setImagesPreview((images: any) => images.concat(fileArray));
    }
  };

  const handleImages = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const filesArray = Array.from(event.target.files).map((file: any) => {
        return file;
      });

      setImages((files: any) => files.concat(filesArray));
    }
  };

  const removeElement = (images: string[], i: number) => images.slice(0, i - 1).concat(images.slice(i, images.length));
  const resetForm = () => {
    reset({
      capacity: {
        value: "",
        label: "",
      },
      nightPrice: "",
      description: "",
      name: "",
      services: [""],
      images: [],
    });
    setImagesPreview([]);
    setImages([]);
    setLocation(undefined);
  };

  const updateRoom = async (data: any) => {
    const filesArray = data.images.filter((image: any) => image instanceof File);
    const objectArray = data.images.filter((image: any) => !(image instanceof File));
    const formBody = { ...data, images: filesArray, image: objectArray };

    const formData = new FormData();
    Object.entries(formBody).forEach(([key, value]) => {
      if (value) {
        if (key === "images") {
          for (const image of filesArray) {
            // console.log(image);
            formData.append("images", image);
          }
        } else if (key === "image") {
          formData.set("image", JSON.stringify(value));
        } else {
          formData.set(key, value as string);
        }
      }
    });
    try {
      const response = await axios.patch(`rooms/${room?._id}`, formData);
      console.log(response.data);
      resetForm();
      router.push(`/preview/${response.data._id}`);
    } catch (error: any) {
      console.log(error?.response?.data.message);
    }
  };

  const addRoom = async (data: any) => {
    const roomBody = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        if (key == "images") {
          for (const image of data.images) {
            roomBody.append(key, image);
          }
        } else {
          roomBody.set(key, value as string);
        }
      }
    });
    try {
      const response = await axios.post("/rooms", roomBody);
      if (response.data) {
        console.log(response.data);
        resetForm();
        router.push(`/preview/${response.data._id}`);
      }
    } catch (error: any) {
      console.log(error?.response?.data?.message);
      setErrorMEssage(error?.response?.data?.message);
      setIsSubmit(false);
    }
  };

  function formHandler(data: FormValues) {
    setIsSubmit(true);
    const finalData = {
      name: data.name,
      description: data.description ? data.description : null,
      capacity: data?.capacity.value,
      nightPrice: data.nightPrice,
      service: data.services,
      longitude: data.location.lng,
      latitude: data.location.lat,
      images: data.images,
    };

    status === "add" ? addRoom(finalData) : updateRoom(finalData);
  }

  return (
    <div className="container mt-3 mb-5 shadow_sm border-r">
      <div className="row">
        <div className={styles.create_cont} dir="rtl">
          <h2 className="heading heading-bold heading-3 mb-1">إضافة غرفة</h2>
          <p className="heading-4 heading-semiBold heading-lightGrey mb-3">أضف بيانات الغرفة المراد عرضها</p>

          <AddRoomForm formHandler={formHandler} register={register} handleSubmit={handleSubmit} options={options} control={control} errors={errors} handleInput={handleInput} imagesPreview={imagesPreview} setImagesPreview={setImagesPreview} getValues={getValues} removeElement={removeElement} handleImages={handleImages} images={images} setImages={setImages} location={location} setLocation={setLocation} services={services} isLoading={isLoading} errorMessage={errorMessage} isSubmit={isSubmit} />
        </div>
      </div>
    </div>
  );
};
