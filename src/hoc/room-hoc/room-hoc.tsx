import { useRouter } from "next/router";
import { RoomComponent } from "../../components/room/room";
import { useRoom } from "../../hooks/use-room.hook";
import { Room } from "../../models";

export const RoomHOC = ({ fallbackRoom }: { fallbackRoom: Room }) => {
  const router = useRouter();
  const roomid = router.query.roomid as string;
  const { room, isLoading, isError } = useRoom(roomid, fallbackRoom);

  console.log(room);
  return <RoomComponent room={room} isLoading={isLoading} />;
};
