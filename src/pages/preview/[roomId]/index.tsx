import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Layout from "../../../components/layout/layout";
import { PreviewHOC } from "../../../hoc/preview-hoc/preview-hoc";
import { Room } from "../../../models";
import axios from "../../../utils/axios";

const Preview = ({ fallbackRoom }: { fallbackRoom: Room }) => {
  const router = useRouter();
  const roomId = router.query.roomId as string;

  return (
    <Layout title="مراجعة">
      <PreviewHOC roomId={roomId} fallbackRoom={fallbackRoom} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params;

  try {
    const response = await axios.get(`/rooms/${params?.roomId}`);
    const room = response.data;
    return {
      props: {
        fallbackRoom: room,
      },
    };
  } catch (error: any) {
    return {
      props: {
        fallbackRoom: {},
      },
    };
  }
};
export default Preview;
