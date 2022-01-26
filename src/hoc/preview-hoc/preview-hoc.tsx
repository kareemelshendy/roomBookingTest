import { useRouter } from "next/router";
import { useState } from "react";
import { useSWRConfig } from "swr";
import { PreviewComponent } from "../../components/preview/preview";
import { useRoom } from "../../hooks/use-room.hook";
import { Room, RoomPage } from "../../models";
import axios from "../../utils/axios";

export interface Props {
  roomId: string;
  fallbackRoom: Room;
}
export const PreviewHOC = ({ roomId, fallbackRoom }: Props) => {
  const [showDisable, setShowDisable] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const { room, isLoading, isError } = useRoom(roomId, fallbackRoom);
  const router = useRouter();
  const { mutate, cache } = useSWRConfig();

  console.log(room);
  function handleDisable() {
    setShowDisable(false);
  }
  function handleDelete() {
    setShowDelete(false);
  }

  const deleteRoom = async () => {
    try {
      const response = await axios.delete(`/rooms/${roomId}`);
      console.log(response?.data);
      await mutate(
        `/rooms?pageNumber=1&owners=${room?.owner?._id}&limit=16`,
        (rooms: RoomPage) => {
          const filter = rooms?.data.filter((room) => room._id !== roomId);
          return { ...rooms, data: filter };
        },
        false
      );

      router.push(`/profile/${room?.owner._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <div>loading ...</div>;

  return <PreviewComponent room={room} showDisable={showDisable} setShowDisable={setShowDisable} handleDisable={handleDisable} showDelete={showDelete} handleDelete={handleDelete} setShowDelete={setShowDelete} deleteRoom={deleteRoom} />;
};
