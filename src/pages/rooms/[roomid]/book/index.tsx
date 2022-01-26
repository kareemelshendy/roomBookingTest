import { useRouter } from "next/router";
import Layout from "../../../../components/layout/layout";
import { BookRoomHOC } from "../../../../hoc/book-room-hoc/book-room-hoc";

const BookingRoom = () => {
  const router = useRouter();
  const roomid = router.query.roomid as string;
  
  return (
    <Layout title="إحجز غرفة">
      <BookRoomHOC roomId={roomid} />
    </Layout>
  );
};

export default BookingRoom;
