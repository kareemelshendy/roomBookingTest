import { GetServerSideProps } from "next";
import Layout from "../components/layout/layout";
import { AddRoomHOC } from "../hoc/add-room-hoc/add-room-hoc";
import { Service } from "../models";
import axios from "../utils/axios";

const CreateRoom = ({ services }: { services: Service[] }) => {
  console.log("services", services);
  return (
    <Layout title="إضافة غرفة">
      <AddRoomHOC fallbackServices={services} imagesArray={null} defaultValues={null} room={null} status="add" />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await axios.get("/services");
    const services = response?.data;

    return {
      props: {
        services,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        services: null,
      },
    };
  }
};

export default CreateRoom;
