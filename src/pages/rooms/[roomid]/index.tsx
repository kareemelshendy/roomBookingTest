import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import Layout from "../../../components/layout/layout";
import { RoomHOC } from "../../../hoc/room-hoc/room-hoc";
import axios from "../../../utils/axios";

const RoomPage = ({ fallbackRoom }: any) => {
  const router = useRouter();
  const { roomId } = router.query;
  // console.log(router.query)
  return (
    <>
      <Layout title="rooms">
        <RoomHOC fallbackRoom={fallbackRoom} />
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params;
  const response = await axios.get(`/rooms/${params?.roomid}`);
  const room = response.data;
  return {
    props: {
      fallbackRoom: room,
    },
  };
};
export default RoomPage;
