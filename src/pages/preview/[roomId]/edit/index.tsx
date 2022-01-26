import { GetServerSideProps } from "next";
import Layout from "../../../../components/layout/layout";
import { AddRoomHOC } from "../../../../hoc/add-room-hoc/add-room-hoc";
import { Room, Service } from "../../../../models";
import axios from "../../../../utils/axios";

interface Props {
  room: Room;
  fallbackServices: Service[];
}
const CreateRoom = ({ room, fallbackServices }: Props) => {
  console.log("room", room);

  const imagesArray = room?.images?.map((image) => {
    return image.original;
  });
  const services = room?.services?.map((service) => {
    return service._id;
  });

  const roomDefault = {
    capacity: {
      value: `${room?.capacity}`,
      label: `${room?.capacity}`,
    },
    nightPrice: `${room?.nightPrice}`,
    description: room?.description,
    name: room?.name,
    services,
    images: room?.images,
    location: {
      lat: room?.location?.coordinates[1],
      lng: room?.location?.coordinates[0],
    },
  };

  console.log("default:", roomDefault);
  return (
    <Layout title="تعديل الغرفة">
      <AddRoomHOC fallbackServices={fallbackServices} imagesArray={imagesArray} defaultValues={roomDefault} status="edit" room={room} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params;

  try {
    const response = await axios(`/rooms/${params?.roomId}`);
    const room = response.data;

    const servicesResponse = await axios("/services");
    const services = servicesResponse.data;

    return {
      props: {
        room,
        fallbackServices: services,
      },
    };
  } catch (error: any) {
    return {
      props: {
        room: {},
        fallbackServices: [],
      },
    };
  }
};
export default CreateRoom;
